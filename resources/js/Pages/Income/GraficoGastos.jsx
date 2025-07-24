import React from "react";
import { useState, useEffect } from "react";
import EChartsReact from "echarts-for-react";
import GlobalFunctions from "../services/GlobalFunctions";

const GraficoGastos = (params) => {
    const glob = new GlobalFunctions();
    const [datos, setDatos] = useState({
        title: {
            text: "",
            subtext: "",
            left: "center",
        },
        tooltip: {
            trigger: "item",
        },
        legend: {
            orient: "vertical",
            left: "right",
        },
        series: [
            {
                name: "",
                type: "pie",
                radius: "80%",
                data: [],
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: "rgba(0, 0, 0, 0.5)",
                    },
                },
            },
        ],
    });
    //Uso lista gastos para hacer que el grafico se actualice
    const [listaGastos, setListaGastos] = useState([]);

    useEffect(() => {
        if (params.listaGastos.length != listaGastos.length) {
            setListaGastos(params.listaGastos);
            procesarDatosGrafico()
        }
    });

    function procesarDatosGrafico() {
        const array = [];
        params.categorias.forEach((element) => {
            const item = {
                name: "",
                value: 0,
                percent: 0
            };
            params.listaGastos.forEach((element1) => {
                if (element.nombreCate == element1.categoria) {
                    item.name = element1.categoria, 
                    item.value = parseInt(item.value) + parseInt(element1.valor);
                }
            });
            item.percent=(item.value*100)/params.totalGastos
            if (item.value > 0) {
                array.push(item);
            }
        });
        array.sort((a, b) => a.value - b.value);
        cargar(array)
    }

    function cargar(array) {
        setDatos({
            title: {
                text: "",
                subtext: "",
                left: "center",
            },
            tooltip: {
                trigger: "item",
                 formatter: function (param) {
                    return (
                        param.name +
                        ": " +
                        param.percent.toFixed(1) +
                        "%"
                    );
                },
            },
            legend: {
                orient: "vertical",
                left: "right",
                show: true,
            },
            series: [
                {
                    name: "",
                    type: "pie",
                    radius: "80%",
                    data: array,
                    label: {
                        show: true,
                        formatter: function (param) {
                            return (
                                param.name +
                                ": $" +
                                glob.formatNumber(param.value)
                            );
                        },
                    },
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: "rgba(0, 0, 0, 0.5)",
                        },
                    },
                },
            ],
        });
    }

    return (
        <div>
            {datos.series[0].data.length > 0 ? (
                <EChartsReact option={datos} />
            ) : (
                ""
            )}
        </div>
    );
};

export default GraficoGastos;
