import React from "react";
import { useState, useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import "../../../css/general.css";
import GlobalFunctions from "../services/GlobalFunctions";
import SelectCategorias from "./SelectCategorias";
import Swal from "sweetalert2";
import TablaGastos from "./TablaGastos";
import NuevoGasto from "./NuevoGasto";
import GraficoGastos from "./GraficoGastos";
import BotonGastoFlotante from "../UIGeneral/BotonGastoFlotante";
import DialogoLoading from "../UIGeneral/DialogoLoading";

const Gastos = (params) => {
    const glob = new GlobalFunctions();
    const [totalGastos, setTotalGastos] = useState(params.gastos);
    const [listaGastos, setListaGastos] = useState(params.listaGastos);
    const [cargar, setCargar] = useState(false);
    const [fechas, setFechas] = useState({
        fechaInicio: "",
        fechaFinal: "",
    });
    const [filtrarCategoria, setFiltrarCategoria] = useState("");
    const [noDatos, setNoDatos] = useState(false);
    const [mostrarGrafico, setMostrarGrafico] = useState(false);

    useEffect(() => {
        if (cargar) {
            cargarDatos();
        }
    }, [listaGastos, fechas, filtrarCategoria]);

    useEffect(() => {
        cargarFechas();
        if (glob.getCookie("cookieGrafico") != null) {
            if (glob.getCookie("cookieGrafico") == "true") {
                setMostrarGrafico(true);
            } else {
                setMostrarGrafico(false);
            }
        }
         glob.setCookie("ultimaPantalla", "Gastos", 3600 * 60 * 24);
    }, []);

    useEffect(() => {
        if (listaGastos.length == 0) {
            setNoDatos(true);
        } else {
            setNoDatos(false);
        }
    }, [listaGastos]);

    function cargarDatos() {
        document.getElementById("btnOpenModalLoading").click();
        const url =
            params.globalVars.myUrl +
            "spend/list/bydate/" +
            fechas.fechaInicio +
            "/" +
            fechas.fechaFinal +
            "/" +
            filtrarCategoria;
        fetch(url)
            .then((response) => {
                return response.json();
            })
            .then((json) => {
                setCargar(false);
                setTotalGastos(json.gastos);
                setListaGastos(json.listaGastos);
                document.getElementById("btnCloseModalLoading").click();
            });
    }

    function confirmarBorrar(item) {
        Swal.fire({
            title:
                "¿Eliminar gasto por " +
                item.categoria +
                " de $" +
                glob.formatNumber(item.valor) +
                " ?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Si, eliminar!",
        }).then((result) => {
            if (result.isConfirmed) {
                fetchEliminarGasto(item);
            }
        });
    }

    function fetchEliminarGasto(item) {
        document.getElementById("btnOpenModalLoading").click();
        axios
            .delete(`${params.globalVars.myUrl}spend/${item.codigo}`,{
                headers: {
                    "X-CSRF-TOKEN": params.token, // Añadir el token aquí
                },
            })
            .then((response) => {
                cargarFechas();
                setTotalGastos(response.data.gastos);
                setListaGastos(response.data.listaGastos);
                document.getElementById("btnCloseModalLoading").click();
                sweetAlert("Gasto eliminado!", "success", 1000)
            })
            .catch((error) => {
                document.getElementById("btnCloseModalLoading").click();
                Swal.fire("Error", error, "error");
            });
    }

    function sweetAlert(mensaje, icono, duracion) {
        Swal.fire({
            title: mensaje,
            icon: icono,
            timer: duracion,
            showConfirmButton: false
        });
    }

    function cargarFechas() {
        const fechaHoy = glob.getFecha().split("-");
        // Para obtener ultimo dia del mes.
        const date = new Date(fechaHoy[0], fechaHoy[1], 0).toLocaleDateString(
            "en-US"
        );
        const ultimoDia = date.split("/");
        setFechas({
            fechaInicio: fechaHoy[0] + "-" + fechaHoy[1] + "-01",
            fechaFinal: fechaHoy[0] + "-" + fechaHoy[1] + "-" + ultimoDia[1],
        });
    }

    function cambioFechaInicio(e) {
        setCargar(true);
        setFechas((valores) => ({
            ...valores,
            fechaInicio: e.target.value,
        }));
    }

    function cambioFechaFinal(e) {
        setCargar(true);
        setFechas((valores) => ({
            ...valores,
            fechaFinal: e.target.value,
        }));
    }

    function cambioCategoria(e) {
        setCargar(true);
        setFiltrarCategoria(e.target.value);
    }

    function reiniciarFiltrarCategoria() {
        if (filtrarCategoria != "") {
            setCargar(true);
            setFiltrarCategoria("");
        }
    }

    function mesAnterior() {
        setCargar(true);
        let fechaHoy = fechas.fechaInicio.split("-");
        let iMesMenos = fechaHoy[1] - 1;

        let ano = fechaHoy[0];
        if (fechaHoy[1] == 1) {
            iMesMenos = 12;
            ano = fechaHoy[0] - 1;
        }
        if (iMesMenos < 10) {
            iMesMenos = "0" + iMesMenos;
        }
        const nuevaFechaInicial = ano + "-" + iMesMenos + "-" + fechaHoy[2];
        //Restar fecha final
        const date = new Date(ano, iMesMenos, 0).toLocaleDateString("en-US");
        const ultimoDia = date.split("/");
        const nuevaFechaFinal = ano + "-" + iMesMenos + "-" + ultimoDia[1];
        setFechas((valores) => ({
            ...valores,
            fechaInicio: nuevaFechaInicial,
            fechaFinal: nuevaFechaFinal,
        }));
    }

    function mesSiguiente() {
        setCargar(true);
        let fechaHoy = fechas.fechaFinal.split("-");
        let FMesMas = parseInt(fechaHoy[1]) + parseInt(1);
        let ano = fechaHoy[0];
        if (fechaHoy[1] == 12) {
            FMesMas = 1;
            ano = parseInt(fechaHoy[0]) + parseInt(1);
        }
        if (FMesMas < 10) {
            FMesMas = "0" + FMesMas;
        }
        const date = new Date(ano, FMesMas, 0).toLocaleDateString("en-US");
        const ultimoDia = date.split("/");
        const nuevaFechaFinal = ano + "-" + FMesMas + "-" + ultimoDia[1];
        setFechas((valores) => ({
            ...valores,
            fechaInicio: ano + "-" + FMesMas + "-01",
            fechaFinal: nuevaFechaFinal,
        }));
    }

    function cambioMostrarGrafico() {
        if (mostrarGrafico) {
            glob.setCookie("cookieGrafico", false, 3600 * 60 * 24);
            setMostrarGrafico(false);
        } else {
            setMostrarGrafico(true);
            glob.setCookie("cookieGrafico", true, 3600 * 60 * 24);
        }
    }

    function goNuevoGasto() {
        document.getElementById("btnDialogoNuevoGasto").click();
    }

    function ingresarGasto(item){
        document.getElementById("dialogoNuevoGasto").click()
        document.getElementById("btnOpenModalLoading").click()
        axios.post(`${params.globalVars.myUrl}spend`, item, {
            headers: {
                'X-CSRF-TOKEN': params.token
            }
        })
        .then(response => {
            setTotalGastos(response.data.gastos);
            setListaGastos(response.data.listaGastos);
            document.getElementById("btnCloseModalLoading").click();
            sweetAlert("Gasto registrado!", "success", 1000);
        })
        .catch(error => {
            document.getElementById("btnCloseModalLoading").click();
            Swal.fire("Error", error.response?.data?.message || "Error al registrar gasto", "error");
        });
    }

    return (
        <AuthenticatedLayout user={params.auth} globalVars={params.globalVars}>
            <Head title="Gastos" />
            <div className="container">
                <div
                    style={{ marginTop: "0.5em" }}
                    className="row justify-content-center"
                >
                    <div
                        style={{ textAlign: "center" }}
                        className="row col-lg-6 col-md-6 col-sm-12 col-12"
                    >
                        <label
                            className="titulo"
                            style={{
                                textAlign: "center",
                                marginBottom: "0.2em",
                            }}
                        >
                            <strong>Gastos entre</strong>
                        </label>
                        <div className="col-2">
                            <button
                                onClick={mesAnterior}
                                className="border border-dark rounded cursorPointer"
                                style={{
                                    marginTop: "0.2em",
                                    marginLeft: "0.2em",
                                    padding: "0.5em",
                                    backgroundColor: "#00722e",
                                }}
                                id="btn_buscar"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    fill="currentColor"
                                    className="bi bi-arrow-left-circle"
                                    viewBox="0 0 16 16"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"
                                    />
                                </svg>
                            </button>
                        </div>
                        <div className="col-4">
                            <input
                                type="date"
                                className="form-control rounded"
                                value={fechas.fechaInicio}
                                onChange={cambioFechaInicio}
                                name="fecha_prest"
                                id="inputDate"
                            />
                        </div>
                        <div className="col-4">
                            <input
                                type="date"
                                className="form-control rounded"
                                value={fechas.fechaFinal}
                                onChange={cambioFechaFinal}
                                name="fecha_prest"
                                id="inputDate"
                            />
                        </div>
                        <div className="col-2">
                            <button
                                onClick={mesSiguiente}
                                className="border border-dark rounded cursorPointer"
                                style={{
                                    marginTop: "0.2em",
                                    marginLeft: "0.2em",
                                    padding: "0.5em",
                                    backgroundColor: "#00722e",
                                }}
                                id="btn_buscar"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    fill="currentColor"
                                    className="bi bi-arrow-right-circle"
                                    viewBox="0 0 16 16"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div
                        style={{
                            marginTop: window.screen.width > 600 ? "" : "0.5em",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                        className="col-lg-6 col-md-6 col-sm-12 col-12"
                    >
                        <span style={{ display: "flex", textAlign: "center" }}>
                            <SelectCategorias
                                getCategoria={cambioCategoria}
                                categorias={params.categorias}
                            />
                            <button
                                onClick={reiniciarFiltrarCategoria}
                                className="border border-dark rounded cursorPointer"
                                style={{
                                    marginLeft: "0.2em",
                                    padding: "0.5em",
                                    backgroundColor: "red",
                                }}
                                id="btn_buscar"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    className="bi bi-x-circle-fill"
                                    viewBox="0 0 16 16"
                                >
                                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
                                </svg>
                            </button>
                        </span>
                    </div>
                </div>
                <div align="center" className="row">
                    <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                        <div
                            style={{ marginTop: "1.5em" }}
                            className="table-responsive"
                        >
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Total gastos</th>
                                        <th scope="col">
                                            $ {glob.formatNumber(totalGastos)}
                                        </th>
                                    </tr>
                                </thead>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div style={{ textAlign: "center" }} className="container">
                <span
                    style={{
                        color: mostrarGrafico ? "gray" : "black",
                        padding: "0.6em",
                        fontSize: "1.3em",
                    }}
                >
                    Lista
                </span>
                <label
                    style={{ marginTop: "0.7em" }}
                    className="relative inline-flex  cursor-pointer"
                >
                    <input
                        onChange={cambioMostrarGrafico}
                        checked={mostrarGrafico}
                        type="checkbox"
                        className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
                <span
                    style={{
                        color: mostrarGrafico ? "black" : "gray",
                        padding: "0.6em",
                        fontSize: "1.3em",
                    }}
                >
                    Gráfico
                </span>
            </div>
            <div
                style={{ display: mostrarGrafico ? "none" : "" }}
                className="container"
            >
                <TablaGastos
                    noDatos={noDatos}
                    datos={listaGastos}
                   confirmarBorrar={confirmarBorrar}
                ></TablaGastos>
            </div>
            <div
                style={{ display: mostrarGrafico ? "" : "none" }}
                className="container"
            >
                <GraficoGastos totalGastos={totalGastos} listaGastos={listaGastos} categorias={params.categorias} />
            </div>
            <button
                type="button"
                id="btnDialogoNuevoGasto"
                style={{ display: "none" }}
                data-toggle="modal"
                data-target="#dialogoNuevoGasto"
            ></button>
            <BotonGastoFlotante colorFondo="#dd5035" onClick={goNuevoGasto} />
            <NuevoGasto
                ingresarGasto={ingresarGasto}
                categorias={params.categorias}
            ></NuevoGasto>
            <DialogoLoading url={params.globalVars.myUrl}></DialogoLoading>
        </AuthenticatedLayout>
    );
};

export default Gastos;
