import { faker } from "@faker-js/faker"
import { Brand, Category, User } from "./models/index.js"
// import { genPassword } from "./lib/function.js"
import { config } from "dotenv"
import db from "mongoose"
import slugify from "slugify"

config()

// await db.connect(process.env.MONGO_URL)

// const hash = await genPassword('Password#123')

// for (let i = 1; i <= 55; i++) {
//     const data = {
//         name: faker.name.fullName(),
//         email: faker.internet.email(),
//         password: hash,
//         phone: faker.phone.number(),
//         address: faker.address.streetAddress(),
//         type: 'Staff',
//     }

//     await User.create(data)
// }



// for (let i = 1; i <= 55; i++) {
//     const data = {
//         name: faker.name.fullName(),
//         email: faker.internet.email(),
//         password: hash,
//         phone: faker.phone.number(),
//         address: faker.address.streetAddress(),
//         type: 'Customer',
//     }

//     await User.create(data)
// }


await db.connect(process.env.MONGO_URL)

for (let i = 1; i<=10; i++){
    const name = faker.commerce.department()
    const data = {
        name,
        slug: slugify(name, {lower: true, remove: /[*+~.()'"!:@]/g })

    }

    await Category.create(data)
}

// for (let i = 1; i<=10; i++){
//     const name = faker.company.name()
//     const data = {
//         name,
//         slug: slugify(name, {lower: true, remove: /[*+~.()'"!:@]/g })

//     }

//     await Brand.create(data)
// }

