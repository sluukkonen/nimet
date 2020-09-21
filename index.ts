import * as femaleFirstnames from "./f_first_names.json"
import * as femaleMiddlenames from "./f_middle_names.json"
import * as maleFirstnames from "./m_first_names.json"
import * as maleMiddleNames from "./m_middle_names.json"
import * as surnames from "./surnames.json"

type Generator<T> = () => T
type Dataset<T> = Array<{ value: T; weight: number }>

const sample = <T>(dataset: Dataset<T>): T => {
  const targetWeight = Math.random()

  let low = 0
  let high = dataset.length - 1

  while (low <= high) {
    const mid = Math.floor((high + low) / 2)
    const entry = dataset[mid]
    const { weight } = entry

    if (weight < targetWeight) {
      low = mid + 1
    } else if (weight > targetWeight) {
      high = mid - 1
    } else {
      return entry.value
    }
  }

  return dataset[low].value
}

const mkGenerator = <T>(dataset: Dataset<T>): Generator<T> => () =>
  sample(dataset)
const fullName = (
  firstName: Generator<string>,
  middleName: Generator<string>,
  lastName: Generator<string>
): Generator<{ firstNames: string; lastName: string }> => () => ({
  firstNames: firstName() + " " + middleName(),
  lastName: lastName(),
})
const either = <T>(g1: Generator<T>, g2: Generator<T>): Generator<T> => () =>
  Math.random() < 0.5 ? g1() : g2()

export const surname = mkGenerator(surnames)

export const femaleFirstname = mkGenerator(femaleFirstnames)
export const femaleMiddlename = mkGenerator(femaleMiddlenames)
export const femaleName = fullName(femaleFirstname, femaleMiddlename, surname)

export const maleFirstname = mkGenerator(maleFirstnames)
export const maleMiddlename = mkGenerator(maleMiddleNames)
export const maleName = fullName(maleFirstname, maleMiddlename, surname)

export const name = either(femaleName, maleName)
