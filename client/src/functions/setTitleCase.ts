function setTitleCase(string:string){
    let firstCharacter = string.charAt(0)
    firstCharacter = firstCharacter.toUpperCase();
    const restOfString = string.substring(1)
    return firstCharacter + restOfString 
}
export default setTitleCase