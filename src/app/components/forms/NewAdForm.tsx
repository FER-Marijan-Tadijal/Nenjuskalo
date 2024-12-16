"use client";

import { HandleNewAdForm } from "@/app/functions/handleNewAdForm"
import { prisma } from "@/prisma";
import { Description } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { z } from "zod";

type category = {
    id: number;
    name: string;
}
type condition = {
    id: number;
    name: string;
}



const newAdSchema = z.object({
    title: z.string().trim()
        .min(3, { message: "title must be at least 3 characters long" })
        .max(30, { message: "title must be 30 characters long or shorter" }),
    description: z.string().trim()
        .min(10, { message: "description must be at least 10 characters long" })
        .max(1000, { message: "description must be 1000 characters long or shorter" }),
    askingprice: z.number()
})

export default function NewAdForm() {

    const [errorMessage, setErrorMessage] = useState<string>("")
    const [categories, setCategories] = useState<category[]>()
    const [conditions, setConditions] = useState<condition[]>()

    const getCategories = async () => {
        try {
            const response = await fetch("http://localhost:3000/api/categories", { method: "GET" });

            if (response) {
                const categories = await response.json();
                setCategories(categories);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const getConditions = async () => {
        try {
            const response = await fetch("http://localhost:3000/api/conditions", { method: "GET" });

            if (response) {
                const conditions = await response.json();
                setConditions(conditions);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getCategories();
        getConditions();
    }, []);

    const clientAction = async (formData: FormData) => {

        const newAd = {
            title: formData.get("title"),
            description: formData.get("description"),
            askingprice: parseInt(formData.get("askingprice") as string),
        }

        const result = newAdSchema.safeParse(newAd);
        if (!result.success) {

            var s: string = ""

            for (var i = 0; i < result.error.issues.length; i++) {
                s = s + result.error.issues[i].path[0] + ": " + result.error.issues[i].message + ". "
            }

            setErrorMessage(s);
            return;
        }

        setErrorMessage("success")
        await HandleNewAdForm(formData);
    }



    return (<form action={clientAction}>
        <span>Naziv artikla:</span><input type="text" required name="title" /> <br />
        <span>Opis artikla:</span><input type="text" required name="description" /> <br />
        <span>Cijena artikla:</span><input type="number" required name="askingprice" /> <br />
        <span>Kategorija:</span>{categories && <select required name="category">
            {categories.map((category, i) => (
                <option key={category.id} value={category.id}>{category.name}</option>
            ))}
        </select>} <br />
        <span>stanje artikla:</span>{conditions && <select required name="condition">
            {conditions.map((condition, i) => (
                <option key={condition.id} value={condition.id}>{condition.name}</option>
            ))}
        </select>}<br />
        <p>{errorMessage}</p>
        <button>Submit</button>
    </form>)
}