module.exports = function solveSudoku(matrix) {
  return getSolve(matrix);
}

function getSolve(matrix) {

  while(true)
  {
    let nextValueChange = {row : 0, column : 0, variations : [] };
    for(let i = 0; i < matrix.length; i++)
      for(let j = 0; j < matrix[i].length; j++)
      {
        let variationArr = [];
        let values = [1,2,3,4,5,6,7,8,9];
        if(matrix[i][j] !== 0) continue;
        values.forEach(value => {
          if(checkHorisontalValue(matrix[i], value) && checkVerticalValue(matrix, j, value)
              && checkCubeValue(matrix, i, j, value))
            variationArr.push(value);
        })
        if(variationArr.length === 1)
        {
            matrix[i][j] = variationArr.pop();
            continue;
        }
        if((nextValueChange.variations.length === 0 || nextValueChange.variations.length > variationArr.length)
              && variationArr.length > 0)
        {
          nextValueChange.variations = variationArr.sort();
          nextValueChange.column = j;
          nextValueChange.row = i;
        }  
      }
    
    if(matrix.findIndex(x=> x.findIndex(y => y === 0) >= 0) < 0)
      return matrix;

    if(nextValueChange.variations.length === 0)
      return null;
      
    if(nextValueChange.variations.length > 0)
    {
      let newMatrix = matrix.slice(0, 9);
      newMatrix[nextValueChange.row][nextValueChange.column] = nextValueChange.variations.shift();
      newMatrix = getSolve(newMatrix);
      if(newMatrix !== null)
       return newMatrix;
    }
  }
}


function checkHorisontalValue(horizontalArr, value)
{
  for(let i = 0; i < horizontalArr.length; i++)
    if(horizontalArr[i] === value)
      return false;
  return true;
}


function checkVerticalValue(matrix, j, value)
{
  for(let i = 0; i < matrix.length; i++)
    if(matrix[i][j] === value)
      return false;
  return true;
}

function checkCubeValue(matrix, i, j, value)
{
  let cubeRowStart = i < 3 ? 0 : i < 6 ? 3 : 6;  
  let cubeColumnStart = j < 3 ? 0 : j < 6 ? 3 : 6;  
  for(let a = cubeRowStart; a < (cubeRowStart + 3); a++)
    for(let b = cubeColumnStart; b < (cubeColumnStart+ 3); b++)
    {
      if(matrix[a][b] === value)
        return false;
    }
  return true;
}