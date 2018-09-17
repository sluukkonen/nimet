const fs = require("fs")
const R = require("ramda")
const { promisify } = require("util")
const xlsx = require("xlsx")

// Create the data files from VRK statistical data.
// https://www.avoindata.fi/data/fi/dataset/none
const sheets = [
  {
    filename: "etunimitilasto-2018-09-03-vrk.xlsx",
    mapping: {
      "Miehet ens": "m_first_names.json",
      "Miehet muut": "m_middle_names.json",
      "Naiset ens": "f_first_names.json",
      "Naiset muut": "f_middle_names.json"
    }
  },
  {
    filename: "sukunimitilasto-2018-09-03-vrk.xlsx",
    mapping: {
      Nimet: "surnames.json"
    }
  }
]

const writeFile = promisify(fs.writeFile)

for (const { filename, mapping } of sheets) {
  const workbook = xlsx.readFile(filename)
  Object.entries(mapping).forEach(([sheetname, outfile]) => {
    const sheet = workbook.Sheets[sheetname]
    const data = xlsx.utils
      .sheet_to_json(sheet, {
        header: 1
      })
      .slice(1)
    const names = R.map(([name]) => name, data)
    const weights = R.map(([, weight]) => Number(weight), data)
    const totalWeight = R.sum(weights)
    const relativeWeights = R.map(weight => weight / totalWeight, weights)
    const cumulativeRelativeWeights = R.scan(R.add, 0, relativeWeights).slice(1)
    const processedData = R.zipWith(
      (value, weight) => ({ value, weight }),
      names,
      cumulativeRelativeWeights
    )

    writeFile(outfile, JSON.stringify(processedData, null, 2))
  })
}
