const EMail = require("../models/eMail");

const getCategories = async (req, res) => {
	try {
		const allECategories = await EMail.find({});

		return res.status(200).json({ allECategories });
	} catch {
		console.log("error", error);
		return res
			.status(500)
			.json({ message: "server side error, Please try again" });
	}
};

const addCategory = async (req, res) => {
	console.log(req.body);
	const { category } = req.body;

	let name = category; 
	console.log("ji", name);

	if (!name) return res.status(400).json({ message: "Please enter name" });

	console.log("j");
	const existingCategory = await EMail.findOne({ name });
	console.log(existingCategory);
	if (existingCategory)
		return res.status(400).json({ message: "Category already exist" });

	console.log("j");
	const newCategory = await EMail.create({ name: name });
	return res.status(201).json({ newCategory });
};

const removeCategory = async (req, res) => {
	// console.log("jj");
	const { categoryName } = req.params;
	console.log("categoryName", categoryName);
	try {
		const category = await EMail.findOne({
			name: categoryName,
		});
		if (!category)
			return res.status(404).json({ message: "Category not found" });

		await EMail.findOneAndDelete({ name: categoryName });

		return res.status(200).json({ message: "Category deleted successfully" });
	} catch (error) {
		console.log("error", error);
		return res
			.status(500)
			.json({ message: "server side error, Please try again" });
	}
};

const getEmails = async (req, res) => {
    const { categoryId } = req.params;
    console.log("categoryId ", categoryId);
    
    try {
        const category = await EMail.findOne
        ({
            name: categoryId,
        });

        if (!category)
            return res.status(404).json({ message: "Category not found" });

        const emails = category.emails;

        return res.status(200).json({ emails });

    } catch (error) {
        console.log("error", error);
        return res
            .status(500)
            .json({ message: "server side error, Please try again" });
    }
}

const addEmail = async (req, res) => {
    const { categoryId } = req.params;
    console.log("data ", req.body);
    const { mail, name } = req.body;

    if (!mail || !name)
        return res.status(400).json({ message: "Please enter name and email" });

    try {
        const category = await EMail.findOne
        ({
            name: categoryId,
        });

        if (!category)
            return res.status(404).json({ message: "Category not found" });

        const newEmail = {
            email: mail,
            name,
        };

        category.emails.push(newEmail);
        await category.save();

        return res.status(201).json({ newEmail });

    }
    catch (error) {
        console.log("error", error);
        return res
            .status(500)
            .json({ message: "server side error, Please try again" });
    }
};

const removeEmail = async (req, res)=>{
	const { categoryId } = req.params;
	const { data } = req.body;
	console.log(categoryId, " ", data);

	const { name, mail } = data;
	
	if (!name || !mail || !categoryId)
		return res.status(400).json({ message: "Please enter name and email" });

	try {
		const category = await EMail.findOne
			({
				name: categoryId,
			});

		if (!category)
			return res.status(404).json({ message: "Category not found" });

		category.emails = category.emails.filter(
			(email) => email.email !== mail && email.name !== name
		);
		await category.save();
		
		return res.status(200).json({ message: "Email removed successfully" });

	}
	catch (error) {
		console.log("error", error);
		return res
			.status(500)
			.json({ message: "server side error, Please try again" });
	}	
	

}
module.exports = {
	getCategories,
	addCategory,
	removeCategory,
	getEmails,
	addEmail,
	removeEmail,
};
