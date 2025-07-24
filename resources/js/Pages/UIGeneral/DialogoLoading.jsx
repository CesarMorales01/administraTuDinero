import React from "react";
import "../../../css/general.css";

const DialogoLoading = (params) => {
    return (
        <div id="modalLoading" className="modal" tabIndex="-1" role="dialog">
            <div className="modal-dialog-centered" role="document">
                <div
                    style={{ backgroundColor: "#FFFFFF10" }}
                    className="modal-content"
                >
                    <img
                        style={{ width: window.screen.width> 600 ? "6%" : "20%", height: "auto" }}
                        className="centerImg"
                        src={params.url + "Images/Config/loading.gif"}
                        alt=""
                    ></img>
                    <div style={{ display: "none" }} className="modal-footer">
                        <button
                            id="btnCloseModalLoading"
                            type="button"
                            className="btn btn-secondary"
                            data-dismiss="modal"
                        ></button>
                    </div>
                </div>
            </div>
            <button
                data-toggle="modal"
                data-target="#modalLoading"
                style={{display: 'none'}}
                id="btnOpenModalLoading"
            ></button>
        </div>
    );
};

export default DialogoLoading;
