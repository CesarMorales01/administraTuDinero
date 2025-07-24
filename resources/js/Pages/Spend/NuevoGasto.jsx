import React from "react";
import { useState, useEffect } from "react";
import GlobalFunctions from "../services/GlobalFunctions";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import Swal from "sweetalert2";
import SelectCategoriasNew from "./SelectCategoriasNewGasto";
import SelectCategoriasNewGasto from "./SelectCategoriasNewGasto";

const NuevoGasto = (params) => {
    const glob = new GlobalFunctions();
    const [gasto, setGasto] = useState({
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
        if (gasto.categoria === "" && categorias.length > 0) {
            setGasto((valores) => ({
                ...valores,
                categoria: categorias[0].codigo,
                nombreCategoria: categorias[0].nombreCate,
            }));
        }
    }, []);

    function validar() {
        if (gasto.valor != "" && gasto.categoria != "") {
            document.getElementById("btnIngresarGasto").click();
            setTimeout(() => {
                fechaHoy();
                setGasto((valores) => ({
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
        setGasto((valores) => ({
            ...valores,
            valor: e.target.value,
        }));
    }

    function cambioComentario(e) {
        setGasto((valores) => ({
            ...valores,
            comentario: e.target.value,
        }));
    }

    function fechaHoy() {
        setTimeout(() => {
            if (gasto.fecha === "") {
                setGasto((valores) => ({
                    ...valores,
                    fecha: glob.getFecha(),
                }));
            }
        }, 100);
    }

    function cambioFecha(e) {
        setGasto((valores) => ({
            ...valores,
            fecha: e.target.value,
        }));
    }

    function cambioCategoriaNewGasto(e) {
        const filter = categorias.filter((art) => art.codigo == e.target.value);
        setGasto((valores) => ({
            ...valores,
            categoria: e.target.value,
            nombreCategoria: filter[0].nombreCate,
        }));
    }

    return (
        <div
            style={{ padding: "1em" }}
            className="modal fade bd-example-modal-lg"
            id="dialogoNuevoGasto"
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
                            Nuevo gasto
                        </h5>
                    </div>
                    <div className="container" style={{ margin: "0.2em" }}>
                        <label style={{ marginTop: "0.4em" }}>Fecha:</label>
                        <br />
                        <form>
                            <button
                                type="button"
                                style={{ display: "none" }}
                                id="btnIngresarGasto"
                                onClick={() => params.ingresarGasto(gasto)}
                            ></button>
                            <input
                                name="fecha"
                                type="date"
                                value={gasto.fecha}
                                className="form-control rounded border"
                                onChange={cambioFecha}
                                id="inputDate"
                            />
                            <label style={{ marginTop: "0.5em" }}>
                                Selecciona categoria:
                            </label>
                            <SelectCategoriasNewGasto
                                getCategoriaNew={cambioCategoriaNewGasto}
                                categorias={categorias}
                            ></SelectCategoriasNewGasto>
                            <label style={{ marginTop: "0.2em" }}>
                                Categoria seleccionada:
                            </label>
                            <input
                                type={"text"}
                                name="nombreCategoria"
                                className="form-control rounded border"
                                disabled
                                value={gasto.nombreCategoria}
                            ></input>
                            <label style={{ marginTop: "0.5em" }}>Valor:</label>
                            <br />
                            <input
                                name="valor"
                                onChange={cambioValor}
                                className="form-control rounded border"
                                type="number"
                                placeholder="Valor"
                                value={gasto.valor}
                            />
                            <br />
                            <textarea
                                name="comentario"
                                onChange={cambioComentario}
                                className="form-control rounded border"
                                placeholder="Comentarios"
                                value={gasto.comentario}
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

export default NuevoGasto;
