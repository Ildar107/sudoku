module.exports = function solveSudoku(matrix) {
  var result = getSolve(matrix)
  console.log(result);
  return result;
}
const values = [1,2,3,4,5,6,7,8,9];

function getSolve(matrix, allVariations = null) {
  if(allVariations === null)
    allVariations = getAllVariation(matrix);

  if(matrix.findIndex(x=> x.findIndex(y => y === 0) >= 0) < 0)
    return matrix;

  for(let cell of allVariations)
    for(let num of cell.variations)
    {
      if(checkAllRules(matrix, cell.row, cell.column, num))
      {
        let newMatrix = matrix.slice(0);
        newMatrix[cell.row][cell.column] = num;
        newMatrix = getSolve(newMatrix, allVariations.slice(0));
        if(newMatrix !== null)
          return newMatrix;
      }
    }
  return null;
}

function checkAllRules(matrix, i, j, num)
{
  return checkHorisontalValue(matrix[i], num) && checkVerticalValue(matrix, j, num)
    && checkCubeValue(matrix, i, j, num);
}

function getUpdatedVariation(matrix, allVariations)
{
  let newAllVariations = [];
  for(let cell of allVariations)
  {
    let newVariations = []
    for(let num of values)
    {
      if(checkAllRules(matrix, cell.row, cell.column, num))
            newVariations.push(num);
    }
    if(newVariations.length === 1)
    {
      matrix[cell.row][cell.column] = newVariations.pop();
      isNotChanged = false;
      continue;
    }
    if(newVariations.length > 0)
    {
      cell.variations = newVariations.sort();
      newAllVariations.push(cell);
    }
  }
  allVariations = newAllVariations.sort((x,y) => x.variations.length < y.variations.length ? -1 
    : x.variations.length > y.variations.length ? 1 : 0);
}

function getAllVariation(matrix)
{
  var allVariations = [];
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
      if(variationForCell.variations.length === 1)
      {
          matrix[i][j] = variationForCell.variations.pop();
          continue;
      }
      variationForCell.variations = variationForCell.variations.sort();
      allVariations.push(variationForCell);
    }
  allVariations = allVariations.sort((x,y) => x.variations.length < y.variations.length ? -1 
    : x.variations.length > y.variations.length ? 1 : 0);
  return allVariations;
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
    for(let b = cubeColumnStart; b < (cubeColumnStart+ 3); b++)
    {
      if(matrix[a][b] === num)
        return false;
    }
  return true;
}