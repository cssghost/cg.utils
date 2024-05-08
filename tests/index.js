
export const sleep = (delay = 0) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay)
  })
}

export async function testTime (cb, times = 100, actionName = 'test action ') {
  const st = Date.now()

  for (let index = 0; index < times; index++) {
    await cb?.()
    
    console.log(`🚀 ~ ${actionName} ~ index:`, index, Date.now() - st + 'ms')
  }
  const end = Date.now() - st

  return end
}