import { customAlphabet } from 'nanoid'
export const useGenerateRandom = (length) => {
  const generateRandomString = () => {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    const nanoid = customAlphabet(alphabet, length)
    return nanoid()
  }

  return {
    generateRandomString
  }
}
