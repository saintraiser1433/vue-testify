export const useConvertLetter = () => {
  const convertToLetter = (index) => {
    return String.fromCharCode(65 + index)
  }

  return { convertToLetter }
}
