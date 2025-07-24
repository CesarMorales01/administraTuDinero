import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import NuevaCategoriaGasto from "./NuevaCategoriaGasto";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import "../../../css/general.css";
import DialogoLoading from "../UIGeneral/DialogoLoading";
import BotonGastoFlotante from "../UIGeneral/BotonGastoFlotante";
// --- Importaciones dnd-kit ---
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    TouchSensor,
    useSensor,
    useSensors,
} from "@dnd-kit/core";
import {
    SortableContext,
    sortableKeyboardCoordinates,
    useSortable,
    arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import axios from "axios";

function SortableItem(props) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: props.id });

    const itemStyle = {
        transform: CSS.Transform.toString(transform),
        transition,
        padding: 16,
        minHeight: "80px",
        border: "2px solid #dd5035",
        color: "black",
        borderRadius: "4px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: isDragging
            ? "0 4px 8px rgba(0,0,0,0.2)"
            : "0 2px 4px rgba(0,0,0,0.1)",
        opacity: isDragging ? 0.8 : 1,
        cursor: "default",
        zIndex: isDragging ? 10 : "auto",
        position: "relative",
    };

    const handleItemBodyClick = (event) => {
        if (!isDragging && props.onItemBodyClick) {
            props.onItemBodyClick(props.id);
        }
    };

    return (
        <div
            ref={setNodeRef}
            style={itemStyle}
            {...attributes}
            onClick={handleItemBodyClick}
        >
            <span
                style={{
                    marginBottom: "8px",
                    textAlign: "center",
                    fontWeight: "bold",
                }}
            >
                {props.name}
            </span>
            <div
                {...listeners}
                style={{
                    width: "100%",
                    padding: "8px",
                    backgroundColor: "#dd5035",
                    borderBottomLeftRadius: "4px",
                    borderBottomRightRadius: "4px",
                    cursor: "grab",
                    textAlign: "center",
                    fontSize: "0.8em",
                    color: "black",
                    touchAction: isDragging ? "none" : "pan-y", // 'none' durante el arrastre para evitar scroll accidental
                    // 'pan-y' cuando no se está arrastrando para permitir scroll
                }}
            >
                Arrastrar...
            </div>
        </div>
    );
}

const CategoriasGastos = (params) => {
    const [categories, setCategories] = useState(params.categorias);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        }),
        useSensor(TouchSensor, {
            activationConstraint: {
                delay: 200, // Retraso en ms antes de activar el arrastre (250ms es común)
                tolerance: 5, // Píxeles de tolerancia durante el delay para iniciar el arrastre
            },
            scrollBoundaryContainer: document.body,
        })
    );

    function handleDragEnd(event) {
        const { active, over } = event;
        let getCates = null;
        if (active.id !== over.id) {
            setCategories((currentCategories) => {
                const oldIndex = currentCategories.findIndex(
                    (cat) => cat.id === active.id
                );
                const newIndex = currentCategories.findIndex(
                    (cat) => cat.id === over.id
                );
                getCates = arrayMove(currentCategories, oldIndex, newIndex);
                return getCates;
            });
            fetchActualizarOrdenCategorias(ordenarCategorias(getCates));
        }
    }

    function ordenarCategorias(array) {
        let contador = 1;
        array.forEach((element) => {
            element.ordenUsuario = contador;
            contador++;
        });
        return array;
    }

    const handleCategoryBodyClick = (category) => {
        Swal.fire({
            title: "Elije una opción:",
            showCancelButton: true,
            showDenyButton: true,
            denyButtonText: "Cancelar",
            denyButtonColor: "gray",
            confirmButtonText: "Editar",
            cancelButtonText: "Eliminar",
            confirmButtonColor: "blue",
            cancelButtonColor: "red",
            reverseButtons: true,
        }).then((result) => {
            if (result.isConfirmed) {
                dialogoEditarCate(category);
            } else if (result.isDenied) {
            } else {
                confirmarEliminarCategoria(category);
            }
        });
    };

    function dialogoEditarCate(category) {
        Swal.fire({
            title: "Escribe nombre para la categoria...",
            input: "text",
            inputValue: category.nombreCate,
            inputAttributes: {
                autocapitalize: "off",
            },
            showCancelButton: true,
            reverseButtons: true,
            confirmButtonText: "Editar categoria",
            confirmButtonColor: "green",
            showLoaderOnConfirm: true,
            preConfirm: async (result) => {
                if (result !== "") {
                    category.nuevoNombre = result;
                    axiosEditarNombreCategoria(category);
                } else {
                    Swal.showValidationMessage(
                        "El nombre de la categoría no puede estar vacío."
                    );
                }
            },
        });
    }

    function axiosEditarNombreCategoria(category) {
        document.getElementById("btnOpenModalLoading").click();
        const url = params.globalVars.myUrl + "editarcategoriagasto";
        axios
            .post(url, {category}, {
                headers: {
                    "X-CSRF-TOKEN": params.token,
                },
            })
            .then((response) => {
                setCategories(response.data);
                sweetAlert("Categoria gastos actualizada!", "success", 500);
                document.getElementById("btnCloseModalLoading").click();
            })
            .catch((error) => {
                document.getElementById("btnCloseModalLoading").click();
                sweetAlert(
                    error.response?.data?.message ||
                        "Error al editar la categoría",
                    "error",
                    2000
                );
            });
    }

    async function fetchActualizarOrdenCategorias(data) {
        if (!data) return;
        document.getElementById("btnOpenModalLoading").click();
        try {
            const url = `${params.globalVars.myUrl}catespend/update`;
            const response = await axios.put(url, data, {
                headers: {
                    "X-CSRF-TOKEN": params.token,
                },
            });
            setCategories(response.data);
            document.getElementById("btnCloseModalLoading").click();
        } catch (error) {
            document.getElementById("btnCloseModalLoading").click();
            sweetAlert(
                error.response?.data?.message ||
                    "Error al actualizar el orden de las categorías",
                "error",
                2000
            );
        }
    }

    function fetchConfirmarEliminar(id) {
        document.getElementById("btnOpenModalLoading").click();
        axios
            .delete(`${params.globalVars.myUrl}catespend/${id}`, {
                headers: {
                    "X-CSRF-TOKEN": params.token,
                },
            })
            .then((response) => {
                if (response.data === "¡Categoria ocupada!") {
                    sweetAlert(
                        "No se puede eliminar. ¡Categoria ocupada!",
                        "warning",
                        2000
                    );
                } else {
                    setCategories(response.data);
                    sweetAlert("¡Categoría eliminada!", "success", 500);
                }
                document.getElementById("btnCloseModalLoading").click();
            })
            .catch((error) => {
                document.getElementById("btnCloseModalLoading").click();
                sweetAlert(
                    error.response?.data?.message ||
                        "Error al eliminar la categoría",
                    "error",
                    2000
                );
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

    function confirmarEliminarCategoria(item) {
        Swal.fire({
            title: `¿Eliminar la categoria ${item.nombreCate} ?`,
            showCancelButton: true,
            confirmButtonText: "Eliminar",
            confirmButtonColor: "#cc0000",
            cancelButtonColor: "gray",
        }).then((result) => {
            if (result.isConfirmed) {
                fetchConfirmarEliminar(item.codigo);
            }
        });
    }

    function abrirDialogoNuevaCategoria() {
        document.getElementById("btnAbrirDialogoNuevaCategoriaGasto").click();
    }

    function fetchNuevaCategoria(item) {
        document.getElementById("btnOpenModalLoading").click();
        const nuevoElemento = item;
        axios
            .post(
                `${params.globalVars.myUrl}catespend`,
                {
                    ...nuevoElemento,
                    _token: params.token
                }
            )
            .then((response) => {
                setCategories(response.data);
                sweetAlert("¡Categoría creada!", "success", 500);
                document.getElementById("btnCloseModalLoading").click();
            })
            .catch((error) => {
                document.getElementById("btnCloseModalLoading").click();
                sweetAlert(
                    error.response?.data?.message ||
                        "Error al crear la categoría",
                    "error",
                    2000
                );
            });
    }

    return (
        <AuthenticatedLayout user={params.auth} globalVars={params.globalVars}>
            <Head title="Categorias Gastos" />
            <BotonGastoFlotante
                colorFondo="#dd5035"
                onClick={abrirDialogoNuevaCategoria}
            />
            <div className="container">
                <div
                    style={{
                        marginTop: window.screen.width > 600 ? "" : "0.5em",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <DndContext
                        sensors={sensors}
                        collisionDetection={closestCenter}
                        onDragEnd={handleDragEnd}
                    >
                        <div
                            style={{
                                padding: 8,
                                width: "500px", // Para pantallas grandes, 500px está bien
                                maxWidth: "95vw", // Limita el ancho en pantallas pequeñas
                                boxSizing: "border-box", // Asegura que el padding no añada ancho extra
                                border: "1px solid lightgrey",
                                backgroundColor: "white",
                                borderRadius: "4px",
                                display: "grid",
                                gridTemplateColumns: "1fr 1fr",
                                gap: "12px",
                            }}
                        >
                            <SortableContext
                                items={categories.map((cat) => cat.id)}
                            >
                                {categories.map((category) => (
                                    <SortableItem
                                        key={category.id}
                                        id={category.id}
                                        name={category.nombreCate}
                                        onItemBodyClick={() =>
                                            handleCategoryBodyClick(category)
                                        }
                                    />
                                ))}
                            </SortableContext>
                        </div>
                    </DndContext>
                </div>
            </div>
            <button
                style={{ display: "none" }}
                data-toggle="modal"
                data-target="#dialogoNuevaCategoriaGasto"
                id="btnAbrirDialogoNuevaCategoriaGasto"
            ></button>
            <NuevaCategoriaGasto
                posicionCate={categories.length}
                fetchNuevaCategoria={fetchNuevaCategoria}
            ></NuevaCategoriaGasto>
            <DialogoLoading url={params.globalVars.myUrl}></DialogoLoading>
        </AuthenticatedLayout>
    );
};

export default CategoriasGastos;
