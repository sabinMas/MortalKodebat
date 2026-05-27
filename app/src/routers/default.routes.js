import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
    res.render("main", {
        title: "MVC Starter App",
        subtitle: "Express + EJS + Static Assets"
    });
});

router.get("/api/oikodomos", (req, res) => {
    res.render("main");
});

export default router;