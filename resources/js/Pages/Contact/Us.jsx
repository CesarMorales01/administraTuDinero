import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import React, { useState, useEffect } from 'react'
import Contact from '../Contact/Contact';
import { Head } from '@inertiajs/react';

const us = (params) => {

    function goCasaBonita() {
        let href = "https://tucasabonita.site/";
        window.open(href, "nuevo", "directories=no, location=no, menubar=no, scrollbars=yes, statusbar=no, tittlebar=no, width=800, height=600");
    }

    function descargarApp() {
        let href = "https://play.google.com/store/apps/details?id=app.example.cesar.spends_control";
        window.open(href, "nuevo", "directories=no, location=no, menubar=no, scrollbars=yes, statusbar=no, tittlebar=no, width=800, height=600");
    }

    function activarHover(id) {
        document.getElementById(id).style.boxShadow = '0px 15px 26px rgba(0, 0, 0, 0.50)'
        document.getElementById(id).style['-webkit-transition'] = 'all 0.2s ease-in'
        document.getElementById(id).style['-moz-transition'] = 'all 0.2s ease-in'
        document.getElementById(id).style['-o-transition'] = 'all 0.2s ease-in'
        document.getElementById(id).style.transition = 'all 0.1s ease-in'
        document.getElementById(id).style.marginTop = '10px'
    }

    function desactivarHover(id) {
        document.getElementById(id).style.boxShadow = '0px 0px 0px rgba(0, 0, 0, 0.50)'
        document.getElementById(id).style['-webkit-transition'] = 'all 0.2s ease-in'
        document.getElementById(id).style['-moz-transition'] = 'all 0.2s ease-in'
        document.getElementById(id).style['-o-transition'] = 'all 0.2s ease-in'
        document.getElementById(id).style.transition = 'all 0.2s ease-in'
        document.getElementById(id).style.marginTop = '0px'
    }

    return (
        <>
            <Head title="Nosotros" />
            <AuthenticatedLayout params={params}>
                <div className='container' style={{ textAlign: 'center' }}>
                    <br />
                    <h5 style={{ marginBottom: window.screen.width > 600 ? '-0.5em' : '0.6em' }} className='superTitulo'>Si tú negocio no está en internet, tu negocio no existe. (Bill Gates)</h5>
                </div>
                <div style={{ padding: window.screen.width > 600 ? '3em' : '0.5em', marginBottom: window.screen.width > 600 ? '-2em' : '0.7em' }} className='row'>
                    <div className='col-lg-12 col-md-12 col-sm-12 col-12'>
                        <p className='parrafosEstilo'>
                            Mi nombre es César Morales, y soy ante todo <strong>emprendedor y empresario</strong>, he experimentado con el "sudor de mi frente" y los "frios en el estómago" las batallas
                            de nosotros los comerciantes. Desde muy joven herede el trabajo de la familia, lo que hoy es <a className='pointer btn btn-link' onClick={goCasaBonita}><strong>Tu casa bonita</strong></a>, fui primero vendedor que estudiante
                            universitario, por tanto, elaborar las facturas a mano y registrar los gastos y costos en un cuaderno, hicieron parte de mi vida.
                        </p>
                    </div>
                    <div style={{ marginTop: '1.5em' }} className='col-lg-3 col-md-5 col-sm-12 col-12 align-self-center'>
                        <img id="imgUs" onTouchEnd={() => desactivarHover("imgUs")} onTouchStart={() => activarHover("imgUs")} className='fluid card-flyer rounded centerImg' style={{ width: '15em', height: '10em', marginTop: '1em' }} alt="" src={params.globalVars.urlRoot + 'Images/Descriptions/graduacion.jpg'}></img>
                    </div>
                    <div style={{ marginTop: '1.5em' }} className='col-lg-9 col-md-7 col-sm-12 col-12'>
                        <p className='parrafosEstilo' style={{ marginTop: '1em' }}>
                            Afortunadamente la vida me bendijo con la oportunidad de cursar las asignaturas de <strong>Administración comercial en la Universidad Manuela Beltrán - ITAE, </strong>
                            donde aprendí que para ahorrar sudor en la frente y evitar "frios en el estomágo", la hermosa ciencia nos brinda herramientas espléndidas en la <strong>administración, la contabilidad, las finanzas, el marketing, y otras áreas más. </strong>
                            Y que un emprendedor que no utilice estos conocimientos, es como aquel campesino que pretende arar la tierra sin herramientas, utilizando solo las manos... Para que un pequeño negocio se
                            convierta en una gran empresa, se debe aplicar en este las prácticas administrativas, contables, financieras, de marketing, etc, construyendo sistemas y procesos que gestionen eficientemente
                            todos sus recursos, tener control sobre ellos, para desplegar exitosamente las estrategias que repercutiran en el cumplimientos de sus objetivos.
                        </p>
                    </div>
                    <div style={{ marginTop: '1.5em' }} className='col-lg-9 col-md-8 col-sm-12 col-12'>
                        <p className='parrafosEstilo'>
                            Pues bien, hasta aquí el campesino ya adquirió algunas herramientas y con la experiencia pudo empezar a cosechar, pero resulta que actualmente <strong>vivimos en un mundo conectado, digitalizado y globalizado.</strong> Y no es un secreto de que si vendes papa, hay muchas más
                            personas y empresas que la venden también, y que la publicitan a través de <strong>redes sociales e internet</strong>, y la exponen fulgurantemente en deliciosas versiones como papas a la francesa, acompañadas de una provocativa hamburguesa, que puedes comprar en
                            su <strong>aplicación o página web</strong> y te la entregan lista en la puerta de tu casa!
                            <br /><br />
                        </p>
                    </div>
                    <div style={{ marginTop: '1em' }} className='col-lg-3 col-md-4 col-sm-12 col-12 align-self-center'>
                        <img id="imgUs1" onTouchEnd={() => desactivarHover("imgUs1")} onTouchStart={() => activarHover("imgUs1")} className='card-flyer rounded centerImg' style={{ width: '13em', height: '10em' }} alt="" src={params.globalVars.urlRoot + 'Images/Descriptions/burguer.gif'}></img>
                    </div>
                    <div style={{ marginTop: '1.5em' }} className='col-lg-9 col-md-8 col-sm-12 col-12'>
                        <p className='parrafosEstilo'>
                            Afortunadamente, también siempre he sido un amante de la ciencia, la tecnología y las computadores, y nuevamente emprendí, esta vez curse las asignaturas de <strong>Desarrollo de software en la universidad digital de Antioquia, </strong> y empece a
                            navegar en el océano de <strong>la informática, los lenguajes de programación, diseño y arquitectura de software, el marketing digital, y mucho más. </strong> Fue pronto que diseñe y desarrolle la aplicación web para mi propia negocio. Y los resultados fueron geniales!
                            Increiblemente, con el suceso de la pandemia del COVID-19 (cuando se decretó las restricciones a la libre movilidad y por ende se limitaron las compras presenciales), ayudo a que <strong>las ventas de </strong><a className='pointer' onClick={goCasaBonita}><strong>Tu casa bonita </strong></a><strong>se catapultaran!
                                los pedidos se triplicaron!</strong>
                            <br />
                        </p>
                    </div>
                    <div style={{ marginTop: '1.5em' }} className='col-lg-3 col-md-4 col-sm-12 col-12'>
                        <img id="imgUs2" onTouchEnd={() => desactivarHover("imgUs2")} onTouchStart={() => activarHover("imgUs2")} className='card-flyer centerImg' style={{ width: '16em', height: '16em' }} alt="" src={params.globalVars.urlRoot + 'Images/Descriptions/programacion.gif'}></img>
                    </div>
                    <div style={{ marginTop: '1em' }} className='col-lg-12 col-md-4 col-sm-12 col-12'>
                        <p className='parrafosEstilo'>
                            Este proyecto, <a className='pointer' href='https://tupaginaweb.site/'><strong>Genial App</strong></a>, es el resultado de la aplicación de los conocimientos en diseño y desarrollo de software combinados con la experiencia obtenida en administración, emprendimiento, contabilidad, marketing y más.
                            <strong> Y cuya finalidad es ayudar a aquellas personas, emprendedores, comerciantes, empresas, etc.</strong>  Proporcionandoles herramientas digitales que faciliten la gestión de sus procesos internos, la comunicación con sus clientes, y la oferta de sus productos, <strong> convirtiendolos en una tarea fácil, intuitiva y eficiente. </strong>
                            Aportando asi al cumplimiento de sus objetivos, a su crecimiento y desarrollo.
                            <br /><br />
                        </p>
                    </div>
                </div>
                <Contact info={params.paramsNavBar.info} globalVars={params.globalVars}></Contact>
            </AuthenticatedLayout>
        </>
    )
}

export default us