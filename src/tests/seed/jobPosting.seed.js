
import { ObjectId } from 'bson'
const dummyBusiness= new ObjectId("64889ac16f77250c1626b56c")
export default [
    {
        _id:new ObjectId("658bdd85577f14920dd6cbcc"),
        business: dummyBusiness,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        title: 'Software Engineer',
        responsibilities: 'Develop and maintain software applications.',
        requirements: 'Bachelor\'s degree in Computer Science, etc.',
        benefits: 'Health insurance, flexible working hours, etc.',
        jobType: 'Full-time',
        datePosted: new Date(),
        deadline: new Date('2024-01-01'),
        expired: false,
        applications: []
    },
]