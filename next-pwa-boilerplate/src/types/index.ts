export type Data = {
  count: 0
}
export type ErrorMsg = {
  name: string,
  message: string,
  stack: [string ] | null
}


export interface MainContextInterface {
  state: Data 
  stateFunctions: {
    setCount: (c:number) => void
    handleInc: () => void
    handleDec: () => void
  }
}