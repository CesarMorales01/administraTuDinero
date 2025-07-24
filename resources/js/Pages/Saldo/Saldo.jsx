import React from "react";
import { useState, useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import "../../../css/general.css";
import "../../../css/saldo.css";
import GlobalFunctions from "../services/GlobalFunctions";
import Swal from "sweetalert2";
import TablaIngresos from "../Income/TablaIngresos";
import NuevoIngreso from "../Income/NuevoIngreso";
import BotonGastoFlotante from "../UIGeneral/BotonGastoFlotante";
import DialogoLoading from "../UIGeneral/DialogoLoading";
import TablaGastos from "../Spend/TablaGastos";
import NuevoGasto from "../Spend/NuevoGasto";

const Saldo = (params) => {
    const glob = new GlobalFunctions();
    const [totalIngresos, setTotalIngresos] = useState(params.ingresos);
    const [listaIngresos, setListaIngresos] = useState(params.listaIngresos);
    const [cargar, setCargar] = useState(false);
    const [fechas, setFechas] = useState({
        fechaInicio: "",
        fechaFinal: "",
    });
    const [totalGastos, setTotalGastos] = useState(params.gastos);
    const [listaGastos, setListaGastos] = useState(params.listaGastos);
    const [noDatosIngresos, setNoDatosIngresos] = useState(false);
    const [noDatosGastos, setNoDatosGastos] = useState(false);
    const [saldo, setSaldo] = useState(0);

    useEffect(() => {
        if (cargar) {
            cargarDatosGastos();
            cargarDatosIngresos();
        }
        calcularSaldo();
        if (listaGastos.length == 0) {
            setNoDatosGastos(true);
        } else {
            setNoDatosGastos(false);
        }
        if (listaIngresos.length == 0) {
            setNoDatosIngresos(true);
        } else {
            setNoDatosIngresos(false);
        }
    }, [listaGastos, fechas, listaIngresos]);

    useEffect(() => {
        cargarFechas();
        calcularSaldo();
        glob.setCookie("ultimaPantalla", "Saldo", 3600 * 60 * 24);
    }, []);

    function calcularSaldo() {
        let totalSpend = 0;
        if (totalGastos != null) {
            totalSpend = totalGastos;
        }
        let totalIncome = 0;
        if (totalIngresos != null) {
            totalIncome = totalIngresos;
        }
        setSaldo(totalIncome - totalSpend);
    }

    function cargarDatosIngresos() {
        const url =
            params.globalVars.myUrl +
            "income/list/bydate/" +
            fechas.fechaInicio +
            "/" +
            fechas.fechaFinal;
        fetch(url)
            .then((response) => {
                return response.json();
            })
            .then((json) => {
                setCargar(false);
                setTotalIngresos(json.ingresos);
                setListaIngresos(json.listaIngresos);
            });
    }

    function cargarDatosGastos() {
        document.getElementById("btnOpenModalLoading").click();
        const url =
            params.globalVars.myUrl +
            "spend/list/bydate/" +
            fechas.fechaInicio +
            "/" +
            fechas.fechaFinal;
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

    function sweetAlert(mensaje, icono, duracion) {
        Swal.fire({
            title: mensaje,
            icon: icono,
            timer: duracion,
            showConfirmButton: false,
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

    function ingresarGasto(item) {
        document.getElementById("dialogoNuevoGasto").click();
        document.getElementById("btnOpenModalLoading").click();
        axios
            .post(`${params.globalVars.myUrl}spend`, item, {
                headers: {
                    "X-CSRF-TOKEN": params.token,
                },
            })
            .then((response) => {
                setTotalGastos(response.data.gastos);
                setListaGastos(response.data.listaGastos);
                document.getElementById("btnCloseModalLoading").click();
                sweetAlert("Gasto registrado!", "success", 1000);
            })
            .catch((error) => {
                document.getElementById("btnCloseModalLoading").click();
                Swal.fire(
                    "Error",
                    error.response?.data?.message || "Error al registrar gasto",
                    "error"
                );
            });
    }

    function ingresarIngreso(item) {
        document.getElementById("dialogoNuevoIngreso").click();
        document.getElementById("btnOpenModalLoading").click();
        axios
            .post(`${params.globalVars.myUrl}income`, item, {
                headers: {
                    "X-CSRF-TOKEN": params.token,
                },
            })
            .then((response) => {
                setTotalIngresos(response.data.ingresos);
                setListaIngresos(response.data.listaIngresos);
                document.getElementById("btnCloseModalLoading").click();
                sweetAlert("Ingreso registrado!", "success", 1000);
            })
            .catch((error) => {
                document.getElementById("btnCloseModalLoading").click();
                Swal.fire(
                    "Error",
                    error.response?.data?.message ||
                        "Error al registrar ingreso",
                    "error"
                );
            });
    }

    function confirmarBorrarIngreso(item) {
        Swal.fire({
            title:
                "¿Eliminar ingreso por " +
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
                fetchEliminarIngreso(item);
            }
        });
    }

    function fetchEliminarIngreso(item) {
        document.getElementById("btnOpenModalLoading").click();
        axios
            .delete(`${params.globalVars.myUrl}income/${item.codigo}`, {
                headers: {
                    "X-CSRF-TOKEN": params.token, // Añadir el token aquí
                },
            })
            .then((response) => {
                cargarFechas();
                setTotalIngresos(response.data.ingresos);
                setListaIngresos(response.data.listaIngresos);
                document.getElementById("btnCloseModalLoading").click();
                sweetAlert("Ingreso eliminado!", "success", 1000);
            })
            .catch((error) => {
                document.getElementById("btnCloseModalLoading").click();
                Swal.fire(error, "error", "error");
            });
    }

    function confirmarBorrarGasto(item) {
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
            .delete(`${params.globalVars.myUrl}spend/${item.codigo}`, {
                headers: {
                    "X-CSRF-TOKEN": params.token, // Añadir el token aquí
                },
            })
            .then((response) => {
                cargarFechas();
                setTotalGastos(response.data.gastos);
                setListaGastos(response.data.listaGastos);
                document.getElementById("btnCloseModalLoading").click();
                sweetAlert("Gasto eliminado!", "success", 1000);
            })
            .catch((error) => {
                document.getElementById("btnCloseModalLoading").click();
                Swal.fire("Error", error, "error");
            });
    }

    function abrirDialogoNuevoIngreso() {
        Swal.fire({
            title: "Registar:",
            showCancelButton: true,
            confirmButtonColor: "#79ad80",
            cancelButtonColor: "#dd5035",
            reverseButtons: true,
            confirmButtonText: "Ingreso",
            cancelButtonText: "Gasto",
            showCloseButton: true,
        }).then((result) => {
            if (result.isConfirmed) {
                document.getElementById("btnDialogoNuevoIngreso").click();
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                document.getElementById("btnDialogoNuevoGasto").click();
            }
        });
    }

    return (
        <AuthenticatedLayout user={params.auth} globalVars={params.globalVars}>
            <Head title="Saldo" />
            <div className="container">
                <div
                    style={{ marginTop: "0.2em" }}
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
                            <strong>Saldo entre</strong>
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
                        className="col-lg-6 col-md-6 col-sm-12 col-12"
                        style={{
                            textAlign: "center",
                            marginBottom:
                                window.screen.width > 600 ? "0em" : "-0.5em",
                        }}
                    >
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Saldo</th>
                                    <th
                                        style={{
                                            color: "#0061a9",
                                        }}
                                        scope="col"
                                    >
                                        $ {glob.formatNumber(saldo)}
                                    </th>
                                </tr>
                            </thead>
                        </table>
                    </div>
                </div>
            </div>
            <div className="contenedor-principal-porcentual">
                <div
                    style={{
                        marginTop:
                            window.screen.width > 600 ? "0.2em" : "-0.4em",
                    }}
                    className="contenedor-tabla-porcentual"
                >
                    <table
                        style={{
                            textAlign: "center",
                            backgroundColor: "#79ad80",
                            marginBottom:
                                window.screen.width > 600 ? "0em" : "-0.5em",
                            marginLeft: "0.1em",
                            marginRight: "0.1em",
                        }}
                        className="table rounded"
                    >
                        <thead>
                            <tr>
                                <th scope="col">Total ingresos</th>
                                <th
                                    style={{
                                        color: "black",
                                    }}
                                    scope="col"
                                >
                                    $ {glob.formatNumber(totalIngresos)}
                                </th>
                            </tr>
                        </thead>
                    </table>
                    <div style={{ marginTop: "-0.7em" }}>
                        <TablaIngresos
                            noDatos={noDatosIngresos}
                            datos={listaIngresos}
                            confirmarBorrar={confirmarBorrarIngreso}
                        />
                    </div>
                </div>
                <div className="contenedor-tabla-porcentual">
                    <table
                        style={{
                            textAlign: "center",
                            backgroundColor: "#dd5035",
                            marginBottom:
                                window.screen.width > 600 ? "0em" : "-0.5em",
                            marginLeft: "0.1em",
                            marginRight: "0.1em",
                        }}
                        className="table rounded"
                    >
                        <thead>
                            <tr>
                                <th scope="col">Total gastos</th>
                                <th
                                    style={{
                                        color: "black",
                                    }}
                                    scope="col"
                                >
                                    $ {glob.formatNumber(totalGastos)}
                                </th>
                            </tr>
                        </thead>
                    </table>
                    <div style={{ marginTop: "-0.7em" }}>
                        <TablaGastos
                            noDatos={noDatosGastos}
                            datos={listaGastos}
                            confirmarBorrar={confirmarBorrarGasto}
                        />
                    </div>
                </div>
            </div>
            <BotonGastoFlotante
                colorFondo="#0061a9"
                onClick={abrirDialogoNuevoIngreso}
            />
            <button
                type="button"
                id="btnDialogoNuevoIngreso"
                style={{ display: "none" }}
                data-toggle="modal"
                data-target="#dialogoNuevoIngreso"
            ></button>
            <NuevoIngreso
                ingresarIngreso={ingresarIngreso}
                categorias={params.categoriasIngresos}
            ></NuevoIngreso>
            <button
                type="button"
                id="btnDialogoNuevoGasto"
                style={{ display: "none" }}
                data-toggle="modal"
                data-target="#dialogoNuevoGasto"
            ></button>
            <NuevoGasto
                ingresarGasto={ingresarGasto}
                categorias={params.categoriasGastos}
            ></NuevoGasto>
            <DialogoLoading url={params.globalVars.myUrl}></DialogoLoading>
        </AuthenticatedLayout>
    );
};

export default Saldo;
