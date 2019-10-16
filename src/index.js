module.exports = function solveSudoku(matrix) {
  var result = getSolve(matrix)
  console.log(matrix);
  return result;
}
const values = [1,2,3,4,5,6,7,8,9];

function getSolve(matrix) {
  
  let cell = getAllVariation(matrix);
  if(cell === null)
    return matrix;

  for(let num of cell.variations)
  {
    if(checkAllRules(matrix, cell.row, cell.column, num))
    {
      matrix[cell.row][cell.column] = num;
      if(getSolve(matrix) !== null)
        return matrix;
      matrix[cell.row][cell.column] = 0;
    }
  }
  return null;
}

function checkAllRules(matrix, i, j, num)
{
  return checkHorisontalValue(matrix[i], num) && checkVerticalValue(matrix, j, num)
    && checkCubeValue(matrix, i, j, num);
}

function getAllVariation(matrix)
{
  for(let i = 0; i < matrix.length; i++)
    for(let j = 0; j < matrix[i].length; j++)
    {
      if(matrix[i][j] !== 0) continue;
      let variationForCell = {row: i, column: j, variations: []};
      for(let num of values) 
      {
        if(checkAllRules(matrix, i, j, num))
          variationForCell.variations.push(num);
      }
      return variationForCell;
    }
  return null;
}

function checkHorisontalValue(horizontalArr, num)
{
  for(let i = 0; i < horizontalArr.length; i++)
    if(horizontalArr[i] === num)
      return false;
  return true;
}

function checkVerticalValue(matrix, j, num)
{
  for(let i = 0; i < matrix.length; i++)
    if(matrix[i][j] === num)
      return false;
  return true;
}

function checkCubeValue(matrix, i, j, num)
{
  let cubeRowStart = i < 3 ? 0 : i < 6 ? 3 : 6;  
  let cubeColumnStart = j < 3 ? 0 : j < 6 ? 3 : 6;  
  for(let a = cubeRowStart; a < (cubeRowStart + 3); a++)
    for(let b = cubeColumnStart; b < (cubeColumnStart + 3); b++)
    {
      if(matrix[a][b] === num)
        return false;
    }
  return true;
}