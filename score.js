const outputs = [];

function onScoreUpdate(dropPosition, bounciness, size, bucketLabel) {
  outputs.push([dropPosition, bounciness, size, bucketLabel]);
}

function runAnalysis() {
  if(!outputs.length > 0)return alert("Plase Enter Dataset ");
  const testSetSize = 100;
  const Ks = 10;

  let bestK = 0;
  let bestFeature = 0;
  let bestAccuracy = 0;

  const featureName = ["Drop Position", "Bounciness", "Size"];

  _.range(0, 3).forEach((feature) => {
    _.range(1, Ks).forEach((k) => {
      const data = _.map(outputs, (row) => [row[feature], _.last(row)]);
      const [testSet, trainingSet] = splitDataset(minMax(data, 1), testSetSize);
      const accuracy = _.chain(testSet)
        .filter(
          (testPoint) =>
            knn(trainingSet, _.initial(testPoint), k) === _.last(testPoint)
        )
        .size()
        .divide(testSetSize)
        .value();

      // console.log(
      //   "for feature that is:",
      //   feature,
      //   " for K :",
      //   k,
      //   " Accuracy is:",
      //   accuracy * 100
      // );

      if(accuracy > bestAccuracy){
        bestAccuracy = accuracy;
        bestFeature = feature;
        bestK = k;
      }
    });
  });

  alert(`Best Feature: ${featureName[bestFeature]}, Best K: ${bestK}, Best Accuracy: ${(bestAccuracy * 100).toFixed(2)}%`);
  fitFinalModel(bestFeature, bestK);
}

function fitFinalModel(bestFeature, bestK) {
  const data = outputs.map(row => [row[bestFeature], _.last(row)]);
  const normalizedData = minMax(data, 1);

  const finalModel = (point) => knn(normalizedData, [point], bestK);

  console.log(`Final Model - Feature: ${bestFeature}, K: ${bestK}, finalModel ${finalModel(5)}`);
  
}



function knn(data, point, k) {
  return _.chain(data)
    .map((row) => {
      return [distance(_.initial(row), point), _.last(row)];
    })
    .sortBy((row) => row[0])
    .slice(0, k)
    .countBy((row) => row[1])
    .toPairs()
    .sortBy((row) => row[1])
    .last()
    .first()
    .parseInt()
    .value();
}

function distance(pointA, pointB) {
  return (
    _.chain(pointA)
      .zip(pointB)
      .map(([a, b]) => (a - b) ** 2)
      .sum()
      .value() ** 0.5
  );
}

function splitDataset(data, testCount) {
  const shuffled = _.shuffle(data);

  const testSet = _.slice(shuffled, 0, testCount);
  const trainingSet = _.slice(shuffled, testCount);

  return [testSet, trainingSet];
}

function minMax(data, featureCount) {
  const clonedData = _.cloneDeep(data);

  for (let i = 0; i < featureCount; i++) {
    const column = clonedData.map((row) => row[i]);

    const min = _.min(column);
    const max = _.max(column);

    for (let j = 0; j < clonedData.length; j++) {
      clonedData[j][i] = (clonedData[j][i] - min) / (max - min);
    }
  }
  return clonedData;
}



// onScoreUpdate(1, 2, 3, 0);
// onScoreUpdate(4, 5, 6, 1);
// onScoreUpdate(7, 8, 9, 0);
// runAnalysis();
