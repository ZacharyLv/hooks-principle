let isMount = true;
let workInProgressHook = null;

const fiber = {
  stateNode: App,
  memoizedState: null,
};

function useState(initiaalState) {
  let hook;

  if (isMount) {
    hook = {
      memoizedState: initialState,
      next: null,
      queue: {
        pending: null
      }
    };
    if (!fiber.memoizedState) {
      fiber.memoizedState = hook;
    } else {
      workInProgressHook.next = hook;
    }
    workInProgressHook = hook;
  } else {
    hook = workInProgressHook;
    workInProgressHook = hook.next;
  }

  let baseState = hook.memoizedState;

  if (hook.queue.pending) {
    let firstUpdate = hook.queue.pending.next;
    do {
      baseState = typeof firstUpdate.action === 'function' ? firstUpdate.action(baseState) : firstUpdate.action;
      firstUpdate = firstUpdate.next;
    } while(firstUpdate !== hook.queue.pending.next);

    hook.queue.pending = null;
    hook.memoizedState = baseState;
  }

  return [baseState, dispatchAction.bind(null, hook.queue)];
}

function dispatchAction(queue, action) {
  let update = {
    action,
    next: null
  };

  if (!queue.pending) {
    update.next = update;
  } else {
    update.next = queue.pending.next;
    queue.pending.next = update;
  }
  queue.pending = update;

  schedule();
}

function schedule() {
  workInProgressHook = fiber.memoizedState;
  const app = fiber.stateNode();
  isMount = false;
  return app;
}

function App() {
  const [num, updateNum] = useState(1);
  const [num2, updateNum2] = useState(10);

  console.log('num', num);
  console.log('num2', num2);

  return ({
    onClick(newNum) {
      updateNum(newNum ? newNum : num => num + 1);
      updateNum2(newNum ? newNum : num => num + 10);
    }
  });
}

window.app = schedule();
