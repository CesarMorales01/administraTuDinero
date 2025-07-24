import React from "react";
import "./VisitWebsiteButton";
import VisitWebsiteButton from "./VisitWebsiteButton";

const Contact = (params) => {
    function goFb() {
        window.open(
            params.info.linkfb,
            "nuevo",
            "directories=no, location=no, menubar=no, scrollbars=yes, statusbar=no, tittlebar=no, width=800, height=600"
        );
    }

    function goInsta() {
        window.open(
            params.info.linkinsta,
            "nuevo",
            "directories=no, location=no, menubar=no, scrollbars=yes, statusbar=no, tittlebar=no, width=800, height=600"
        );
    }

    function goWhats() {
        let href =
            "https://api.whatsapp.com/send?phone=573116186785&text=Hola! He visitado tu página y me gustaria preguntar algo!";
        window.open(
            href,
            "nuevo",
            "directories=no, location=no, menubar=no, scrollbars=yes, statusbar=no, tittlebar=no, width=800, height=600"
        );
    }

    function goGenialApp() {
        window.open(
            "https://tupaginaweb.site",
            "nuevo",
            "directories=no, location=no, menubar=no, scrollbars=yes, statusbar=no, tittlebar=no, width=800, height=600"
        );
    }

    return (
        <footer
            style={{ margin: "0.4em" }}
            className="page-footer font-small sombraBlanco"
        >
            <br />
            <h4 style={{ textAlign: "center" }} className="superTitulo">
                ¡Cuéntanos como podemos ayudar a cumplir tus sueños y metas!
            </h4>
            <br />
            <div
                style={{ cursor: "pointer" }}
                onClick={goGenialApp}
                className="row"
            >
                <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                    <img
                        className="img-fluid card-flyer rounded centerImg"
                        style={{ width: "40%", padding: "1em" }}
                        alt=""
                        src={
                            "https://tupaginaweb.site/Images/Config/imgGenialApp.png"
                        }
                    />
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12 col-12 align-self-center">
                    <div style={{ marginTop: "1em" }}>
                        <h5
                            style={{
                                fontSize: "1.2em",
                                padding: "0.5em",
                                textTransform: "uppercase",
                            }}
                            className="textAlignCenter superTituloNegro"
                        >
                            Contáctanos
                        </h5>
                        <p style={{ marginTop: "0.5em", cursor: "pointer" }}>
                            <i
                                style={{ marginRight: "0.4em" }}
                                className="fa-solid fa-location-dot fa-lg"
                            ></i>
                            {params.info.direccion_pagina}
                        </p>
                        <p style={{ marginTop: "1em" }}>
                            <i
                                style={{ marginRight: "0.4em" }}
                                className="fa-solid fa-phone-volume fa-lg"
                            ></i>
                            +57 3116186785
                        </p>
                        <p style={{ marginTop: "1em" }}>
                            <i
                                style={{ marginRight: "0.4em" }}
                                className="fa-regular fa-envelope fa-lg"
                            ></i>
                            {params.info.correo}
                        </p>
                    </div>
                    <div style={{ marginTop: "1em" }}>
                        <h5
                            style={{
                                fontSize: "1.2em",
                                padding: "0.5em",
                                textTransform: "uppercase",
                                marginBottom: "0.8em",
                            }}
                            className="textAlignCenter superTituloNegro"
                        >
                            Siguenos
                        </h5>
                        <p style={{ marginBottom: "0.5em" }}>
                            <a
                                onClick={goInsta}
                                style={{ cursor: "pointer", color: "#c82590" }}
                            >
                                <i
                                    style={{
                                        marginRight: "0.4em",
                                        color: "#c82590",
                                    }}
                                    className="fa-brands fa-instagram fa-lg"
                                ></i>
                                https://www.instagram.com/genial.app
                            </a>
                        </p>
                        <p style={{ marginBottom: "0.5em" }}>
                            <a
                                onClick={goFb}
                                style={{ cursor: "pointer", color: "blue" }}
                            >
                                <i
                                    style={{
                                        marginRight: "0.4em",
                                        color: "blue",
                                    }}
                                    className="fa-brands fa-facebook fa-lg"
                                ></i>
                                {params.info.linkfb}
                            </a>
                        </p>
                        <p style={{ marginBottom: "0.5em" }}>
                            <a
                                onClick={goWhats}
                                style={{ cursor: "pointer", color: "green" }}
                            >
                                <i
                                    style={{
                                        marginRight: "0.4em",
                                        color: "green",
                                    }}
                                    className="fa-brands fa-whatsapp fa-lg"
                                ></i>
                                +57 3116186785
                            </a>
                        </p>
                    </div>
                </div>
            </div>
            <div style={{ textAlign: "center" }}>
                <VisitWebsiteButton></VisitWebsiteButton>
            </div>
        </footer>
    );
};

export default Contact;
