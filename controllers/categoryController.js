import categoryModel from "../models/categoryModel.js";
import slugify from "slugify";
export const createCategoryController = async(req,res)=>{
    try {
        const {name} = req.body;
        if(!name){
            return res.status(401).json({message:'Name is required'});
        }

        const existingCategory = await categoryModel.findOne({ name });
        if(existingCategory){
            return res.status(401).json({
                message:'Category already exists'
        });
    }
         const category = await new categoryModel({name, slug:slugify(name)}).save();
         res.status(201).send({
            success: true,
            message: 'Category created successfully',
            category
         })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message: 'Error creating category',
            error: error.message
        });
    }
}

// update category controller

export const updateCategoryController = async (req,res)=>{
        try {
            const {name} = req.body;
            const {id} = req.params;
            const category = await categoryModel.findByIdAndUpdate(id,{name,slug:slugify(name)},{new:true});
            res.status(200).send({
                success:true,
                message:'Category updated successfully',
                category
            })
        } catch (error) {
            console.log(error)
            res.status(500).json({
                success:false,
                message: 'Error while updating category',
                error: error.message
            });
        }
}


// Get all categories

export const categoryController = async(req,res)=>{
    try {
        const category = await categoryModel.find({});
        res.status(200).send({
            success:true,
            message: "All Categories List",
            category
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message: 'Error while getting all categories',
            error: error.message
        });
    }
}

// Get Single Category

export const singleCategoryController = async(req,res)=>{
    try {
        
        const category = await categoryModel.findOne({slug:req.params.slug});
        res.status(200).send({
            success:true,
            message: "Get Single Catgory Successfully",
            category
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message: 'Error while getting single category',
            error: error.message
        });
    }

}

// Delete a single category

export const deleteCategoryController = async(req,res)=>{
        try {
            const {id}= req.params;
            await categoryModel.findByIdAndDelete(id);
            res.status(200).send({
                success:true,
                message: "Category Deleted Successfully"
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                success:false,
                message: 'Error while deleting category',
                error: error.message
            });
        }
}