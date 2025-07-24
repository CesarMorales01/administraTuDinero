import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import React from "react";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";

const NuevaCategoriaGasto = (params) => {
    const [nuevaCategoria, setNuevaCategoria] = useState({
        nombreCate: "",
        ordenUsuario: params.posicionCate,
    });

    function cambioNombre(e) {
        setNuevaCategoria((valores) => ({
            ...valores,
            nombreCate: e.target.value,
        }));
    }

    function cambioPosicion(e) {
        setNuevaCategoria((valores) => ({
            ...valores,
            ordenUsuario: e.target.value,
        }));
    }

    function sweetAlert(mensaje) {
        Swal.fire({
            title: mensaje,
            icon: "warning",
            timer: 1500,
        });
    }

    function confirmar() {
        if (nuevaCategoria.nombreCate == "") {
            sweetAlert("Ingresa un nombre para la categoria!");
        } else {
            document.getElementById("btnGoNuevaCategoria").click();
            setNuevaCategoria((valores) => ({
                ...valores,
                nombreCate: "",
                ordenUsuario: params.posicionCate,
            }));
        }
    }

    return (
        <div
            className="modal fade bd-example-modal-lg"
            id="dialogoNuevaCategoriaGasto"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="myLargeModalLabel"
            aria-hidden="true"
        >
            <div style={{ marginTop: "2em" }} className="modal-dialog ">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5
                            className="modal-title titulo"
                            id="exampleModalLabel"
                        >
                            Nueva categoria de gastos
                        </h5>
                    </div>
                    <div className="container" style={{ margin: "0.2em" }}>
                        <button
                            id="btnGoNuevaCategoria"
                            style={{ display: "none" }}
                            data-dismiss="modal"
                            onClick={() =>
                                params.fetchNuevaCategoria(nuevaCategoria)
                            }
                        ></button>
                        <form>
                            <label>Nombre categoria:</label>
                            <input
                                onChange={cambioNombre}
                                className="form-control rounded"
                                type="text"
                                value={nuevaCategoria.nombreCate}
                                placeholder="Nombre categoria"
                            />
                            <br />
                            <label>Posicion (Opcional):</label>
                            <input
                                className="form-control rounded"
                                type="number"
                                value={nuevaCategoria.ordenUsuario}
                                onChange={cambioPosicion}
                            ></input>
                        </form>
                        <br />
                        <div className="modal-footer">
                            <SecondaryButton
                                type="button"
                                className="btn btn-danger"
                                data-dismiss="modal"
                            >
                                Cancelar
                            </SecondaryButton>
                            <PrimaryButton
                                style={{ padding: "0.7em" }}
                                type="button"
                                className="btn btn-success"
                                onClick={confirmar}
                            >
                                Crear categoria
                            </PrimaryButton>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NuevaCategoriaGasto;
