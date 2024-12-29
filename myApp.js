require("dotenv").config();
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

let Person;

const personSchema = new mongoose.Schema({
	name: { type: String, required: true },
	age: Number,
	favoriteFoods: [String],
});

Person = mongoose.model("Person", personSchema);

const createAndSavePerson = (done) => {
	const person = new Person({
		name: "John",
		age: 25,
		favoriteFoods: ["Pizza", "Pasta"],
	});

	person.save((err, data) => {
		if (err) return console.error(err);
		done(null, data);
	});
};

const createManyPeople = (arrayOfPeople, done) => {
	Person.create(arrayOfPeople, (err, data) => {
		if (err) return console.error(err);
		done(null, data);
	});
};

const findPeopleByName = (personName, done) => {
	Person.find({ name: personName }, (err, data) => {
		if (err) return console.error(err);
		done(null, data);
	});
};

const findOneByFood = async (food, done) => {
	try {
		const person = await Person.findOne({ favoriteFoods: food });
		done(null, person);
	} catch (err) {
		done(err);
	}
};

const findPersonById = (personId, done) => {
	Person.findById(personId, (err, data) => {
		if (err) return console.error(err);
		done(null, data);
	});
};

const findEditThenSave = (personId, done) => {
	const foodToAdd = "hamburger";

	findPersonById(
		personId,
		(err, person) => {
			if (err) return console.error(err);

			person.favoriteFoods.push(foodToAdd);
			person.save((err, data) => {
				if (err) return console.error(err);
				done(null, data);
			});
		} /*, data*/,
	);
};

const findAndUpdate = async (personName, done) => {
	const ageToSet = 20;

	try {
		const updatedPerson = await Person.findOneAndUpdate(
			{ name: personName },
			{ age: ageToSet },
			{ new: true },
		);
		done(null, updatedPerson);
	} catch (err) {
		done(err);
	}
};

const removeById = (personId, done) => {
	Person.findByIdAndRemove(personId, (err, data) => {
		if (err) return console.error(err);
		done(null, data);
	});
};

const removeManyPeople = (done) => {
	const nameToRemove = "Mary";

	done(null /*, data*/);
};

const queryChain = (done) => {
	const foodToSearch = "burrito";

	done(null /*, data*/);
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
