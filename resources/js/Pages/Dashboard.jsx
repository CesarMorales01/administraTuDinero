import React from "react";
import logo from "../../../public/Images/Config/ahorro.png";

function DashBoard(params) {
    // Colores extraídos de la imagen y complementarios para el contraste
    const primaryColor = "#1e90ff"; // Un azul vibrante similar al cerdito
    const secondaryColor = "#ff6347"; // Un rojo anaranjado para acentos
    const accentColor = "#ffd700"; // Un amarillo dorado para destacar
    const textColor = "#333333"; // Gris oscuro para el texto principal
    const lightBgColor = "#f0f8ff"; // Fondo muy claro para contraste

    return (
        <div
            className="min-h-screen flex items-center justify-center p-4"
            style={{
                backgroundColor: lightBgColor,
                fontFamily: "Inter, sans-serif",
            }}
        >
            <div
                className="max-w-4xl w-full bg-white rounded-xl shadow-2xl overflow-hidden md:flex"
                style={{ borderColor: primaryColor, borderWidth: "2px" }}
            >
                {/* Sección de imagen y bienvenida */}
                <div
                    className="md:w-1/2 p-8 flex flex-col items-center justify-center text-center"
                    style={{ backgroundColor: primaryColor, color: "white" }}
                >
                    <img
                        src={logo}
                        alt="Icono de Ahorro y Finanzas"
                        className="w-28 h-28 mb-2 rounded-full shadow-lg"
                    />
                    <h1 className="text-4xl font-bold mb-4">
                        ¡Bienvenido a administra tu dinero!
                    </h1>
                    <p className="text-lg opacity-90">
                        Tu camino hacia la libertad financiera comienza aquí.
                    </p>
                    {/* Contenedor para los botones de acción */}
                    <div
                        style={{ marginTop: "2em" }}
                        className="flex flex-col space-y-4 w-full max-w-xs"
                    >
                        <a
                            className="py-3 px-6 rounded-lg text-lg font-bold transition duration-300 ease-in-out transform hover:scale-105"
                            style={{
                                backgroundColor: accentColor,
                                color: primaryColor,
                                boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
                            }}
                            href={route("login")}
                        >
                            Iniciar Sesión
                        </a>
                        <a
                            className="py-3 px-6 rounded-lg text-lg font-bold transition duration-300 ease-in-out transform hover:scale-105"
                            style={{
                                backgroundColor: "white",
                                color: primaryColor,
                                border: `2px solid ${accentColor}`,
                                boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
                            }}
                             href={route("register")}
                        >
                            Registrate, ¡es gratis!
                        </a>
                    </div>
                </div>
                {/* Sección de contenido principal */}
                <div
                    className="md:w-1/2 p-8 flex flex-col justify-center"
                    style={{ color: textColor }}
                >
                    <h2
                        className="text-3xl font-extrabold mb-6 text-center"
                        style={{ color: primaryColor }}
                    >
                        La importancia de controlar tus finanzas
                    </h2>

                    <div className="mb-6">
                        <h3
                            className="text-xl font-semibold mb-2"
                            style={{ color: secondaryColor }}
                        >
                            Fomenta el Ahorro
                        </h3>
                        <p className="leading-relaxed">
                            Registrar tus gastos e ingresos te permite ver
                            exactamente a dónde va tu dinero. Al identificar
                            patrones y áreas de gasto excesivo, puedes tomar
                            decisiones informadas para reducir costos y aumentar
                            tus ahorros. ¡Cada pequeña cantidad cuenta!
                        </p>
                    </div>

                    <div className="mb-6">
                        <h3
                            className="text-xl font-semibold mb-2"
                            style={{ color: secondaryColor }}
                        >
                            Impulsa la Inversión
                        </h3>
                        <p className="leading-relaxed">
                            Una vez que tienes un control claro de tus finanzas
                            y has logrado ahorrar, el siguiente paso es hacer
                            que tu dinero trabaje para ti. Entender tus flujos
                            de efectivo te prepara para explorar oportunidades
                            de inversión, desde las más conservadoras hasta las
                            de mayor crecimiento.
                        </p>
                    </div>

                    <div className="mb-8">
                        <h3
                            className="text-xl font-semibold mb-2"
                            style={{ color: secondaryColor }}
                        >
                            Alcanza tus Metas
                        </h3>
                        <p className="leading-relaxed">
                            Ya sea que sueñes con comprar una casa, viajar por
                            el mundo, o asegurar tu jubilación, una gestión
                            financiera sólida es la clave. Nuestra aplicación te
                            ayudará a visualizar tu progreso y a mantenerte
                            motivado en el camino hacia tus objetivos.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DashBoard;
