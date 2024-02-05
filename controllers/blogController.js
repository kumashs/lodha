// controllers/blogController.js
const fs = require("fs");

exports.updateBlog = async (req, res, next) => {
    try {
        const fileData = fs.readFileSync("./data.json", { encoding: "utf-8" });
        let arr = JSON.parse(fileData);
        console.log(arr);
        const blogIdToUpdate = Number(req.body.blog_id);

        // Find the index of the entry with the specified blog_id
        const indexToUpdate = arr.findIndex(
            (entry) => entry.blog_id === blogIdToUpdate
        );

        if (indexToUpdate !== -1) {
            // Update the entry if found
            arr[indexToUpdate] = {
                blog_id: blogIdToUpdate,
                createdAt: req.body.createdAt,
                title: req.body.title,
                description: req.body.description,
            };

            // Use asynchronous write operation
            fs.writeFileSync("./data.json", JSON.stringify(arr, null, 2), {
                encoding: "utf-8",
            });

            res.send({ success: 1, message: "Data updated successfully" });
        } else {
            res.status(404).send({
                success: 0,
                message: "Entry not found for the specified blog_id",
            });
        }
    } catch (error) {
        next(error);
    }
};

exports.deleteBlog = async (req, res, next) => {
    try {
        const fileData = fs.readFileSync("./data.json", { encoding: "utf-8" });
        let arr = JSON.parse(fileData);
        const blogIdToDelete = Number(req.params.blog_id);

        const indexToDelete = arr.findIndex(
            (entry) => entry.blog_id === blogIdToDelete
        );

        if (indexToDelete !== -1) {
            arr.splice(indexToDelete, 1);

            fs.writeFileSync("./data.json", JSON.stringify(arr, null, 2), {
                encoding: "utf-8",
            });

            res.send({ success: 1, message: "Data deleted successfully" });
        } else {
            res.status(404).send({
                success: 0,
                message: "Entry not found for the specified blog_id",
            });
        }
    } catch (error) {
        next(error);
    }
};

exports.retrieveBlog = async (req, res, next) => {
    try {
        const data = fs.readFileSync("./data.json", { encoding: "utf8" });
        res.json({ data: JSON.parse(data) });
    } catch (error) {
        next(error);
    }
};

exports.createAndStore = async (req, res, next) => {
    try {
        const fileData = fs.readFileSync("./data.json", { encoding: "utf-8" });
        console.log(req);
        const arr = JSON.parse(fileData);
        const existingData = arr.find((data) => {
            return data.blog_id === req.body.blog_id;
        });
        if (!existingData) {
            arr.push({
                blog_id: req.body.blog_id,
                createdAt: req.body.createdAt,
                title: req.body.title,
                description: req.body.description,
            });
            // Use asynchronous write operation
            fs.writeFileSync("./data.json", JSON.stringify(arr, null, 2), {
                encoding: "utf-8",
            });
            res.send({ success: 1, message: "Data updated successfully" });
        } else {
            res.status(403).send({
                success: 0,
                message: "Data already exists!",
            });
        }
    } catch (error) {
        next(error);
    }
};
