### Nimet

Create realistic Finnish names

## API

# Full names

```typescript
import { name, maleName, femaleName } from "nimet"

const randomName = name() // => { firstNames: 'Jere Sakari', lastName: 'Tarakkamäki' }
const randomMaleName = maleName() // => { firstNames: 'Hannu Christian', lastName: 'Simola' }
const randomFemaleName = femaleName() // => { firstNames: 'Elvi Kyllikki', lastName: 'Keskinen' }
```

# Surnames

```typescript
import { surname } from "nimet"

const randomSurname = surname() // => 'Latva'
```

# Gender-specific names

```typescript
import { maleFirstname, maleMiddlename } from "nimet"

const randomFirstname = maleFirstname() // => 'Leo'
const randomMiddleName = maleMiddlename() // => 'Juha'
```

```typescript
import { femaleFirstname, femaleMiddlename } from "nimet"

const randomFirstname = femaleFirstname() // => 'Katja'
const randomMiddleName = femaleMiddlename() // => 'Mari'
```
