import React from "react";
import { useState, useEffect } from "react";
import GlobalFunctions from "../services/GlobalFunctions";
import SecondaryButton from "@/Components/SecondaryButton";
import Swal from "sweetalert2";
import SelectCategoriasNew from "./SelectCategoriasNew";

const NuevoIngreso = (params) => {
    const glob = new GlobalFunctions();
    const [ingreso, setIngreso] = useState({
        fecha: "",
        categoria: "",
        nombreCategoria: "",
        valor: 0,
        comentario: "",
    });
    const [categorias] = useState(params.categorias);

    useEffect(() => {
        fechaHoy();
        // Inicializar categoria
        if (ingreso.categoria == "" && categorias.length > 0) {
            setIngreso((valores) => ({
                ...valores,
                categoria: categorias[0].codigo,
                nombreCategoria: categorias[0].nombreCate,
            }));
        }
    }, []);

    function validar() {
        if (ingreso.valor != "" && ingreso.categoria != "") {
            document.getElementById("btnIngresarIngreso").click();
            setTimeout(() => {
                fechaHoy();
                setIngreso((valores) => ({
                    ...valores,
                    valor: 0,
                    comentario: "",
                }));
            }, 2000);
        } else {
            sweetAlert();
        }
    }

    function sweetAlert() {
        Swal.fire({
            title: "Ingresa categoria y/o valor!",
            icon: "warning",
            timer: 1500,
        });
    }

    function cambioValor(e) {
        setIngreso((valores) => ({
            ...valores,
            valor: e.target.value,
        }));
    }

    function cambioComentario(e) {
        setIngreso((valores) => ({
            ...valores,
            comentario: e.target.value,
        }));
    }

    function fechaHoy() {
        setTimeout(() => {
            if (ingreso.fecha === "") {
                setIngreso((valores) => ({
                    ...valores,
                    fecha: glob.getFecha(),
                }));
            }
        }, 100);
    }

    function cambioFecha(e) {
        setIngreso((valores) => ({
            ...valores,
            fecha: e.target.value,
        }));
    }

    function cambioCategoriaNew(e) {
        const filter = categorias.filter((art) => art.codigo == e.target.value);
        setIngreso((valores) => ({
            ...valores,
            categoria: e.target.value,
            nombreCategoria: filter[0].nombreCate,
        }));
    }

    return (
        <div
            style={{ padding: "1em" }}
            className="modal fade bd-example-modal-lg"
            id="dialogoNuevoIngreso"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="myLargeModalLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5
                            className="modal-title titulo"
                            id="exampleModalLabel"
                        >
                            Nuevo Ingreso
                        </h5>
                    </div>
                    <div className="container" style={{ margin: "0.2em" }}>
                        <label style={{ marginTop: "0.4em" }}>Fecha:</label>
                        <br />
                        <form>
                            <button
                                type="button"
                                style={{ display: "none" }}
                                id="btnIngresarIngreso"
                                onClick={() => params.ingresarIngreso(ingreso)}
                            ></button>
                            <input
                                name="fecha"
                                type="date"
                                value={ingreso.fecha}
                                className="form-control rounded border"
                                onChange={cambioFecha}
                                id="inputDate"
                            />
                            <label style={{ marginTop: "0.5em" }}>
                                Selecciona categoria:
                            </label>
                            <SelectCategoriasNew
                                getCategoriaNew={cambioCategoriaNew}
                                categorias={categorias}
                            ></SelectCategoriasNew>
                            <label style={{ marginTop: "0.2em" }}>
                                Categoria seleccionada:
                            </label>
                            <input
                                type={"text"}
                                name="nombreCategoria"
                                className="form-control rounded border"
                                disabled
                                value={ingreso.nombreCategoria}
                            ></input>
                            <label style={{ marginTop: "0.5em" }}>Valor:</label>
                            <br />
                            <input
                                name="valor"
                                onChange={cambioValor}
                                className="form-control rounded border"
                                type="number"
                                placeholder="Valor"
                                value={ingreso.valor}
                            />
                            <br />
                            <textarea
                                name="comentario"
                                onChange={cambioComentario}
                                className="form-control rounded border"
                                placeholder="Comentarios"
                                value={ingreso.comentario}
                            ></textarea>
                        </form>
                        <div
                            style={{ marginTop: "1em", marginBottom: "1em" }}
                            className="col text-center"
                        >
                            <div className="modal-footer">
                                <SecondaryButton
                                    type="button"
                                    style={{ backgroundColor: "#d22c21" }}
                                    data-dismiss="modal"
                                >
                                    Cancelar
                                </SecondaryButton>
                                <button
                                    id="btnAgregarIngreso"
                                    onClick={validar}
                                    className="btn btn-success btnVerde"
                                    type="button"
                                >
                                    Ingresar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NuevoIngreso;
