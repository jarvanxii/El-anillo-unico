<template>
    <div class="bilbo-page">
        <section class="hero-banner">
            <img src="@/assets/banners/banner-bilbo.png" alt="El antiguo mapa de Bilbo" />
        </section>
        <main class="content container">
            <section class="section-box">
                <h2>Fundamentos de Redes</h2>
                <p>
                    En los albores de toda comunicación digital se alzan dos grandes mapas:
                    el <strong>Modelo OSI</strong>, torre de siete niveles donde cada capa cumple un deber sagrado,
                    y el <strong>Modelo TCP/IP</strong>, senda más breve y práctica usada en los reinos modernos.
                </p>
                <p>
                    La <strong>encapsulación de datos</strong> es el arte de envolver un mensaje en capas sucesivas,
                    como pergamino dentro de cofres sellados, hasta que alcanza su destino.
                </p>
                <p>
                    Las <strong>direcciones MAC</strong> marcan la identidad física de cada artefacto de red,
                    mientras las <strong>direcciones IP</strong> señalan su morada lógica dentro del vasto mundo.
                    Sean <strong>IPv4</strong>, antigua numeración limitada, o <strong>IPv6</strong>,
                    nueva estirpe casi infinita.
                </p>
                <p>
                    Las <strong>clases IP</strong> fueron antiguas divisiones del territorio;
                    <strong>CIDR</strong> trajo una era más sabia y flexible.
                    El <strong>subnetting</strong> divide grandes dominios en provincias menores,
                    para gobernar con orden y disciplina.
                </p>
                <p>
                    La <strong>puerta de enlace (Gateway)</strong> es la salida principal hacia otros mundos.
                    <strong>ARP</strong> descubre qué MAC corresponde a una IP cercana.
                    <strong>ICMP</strong> lleva avisos, errores y respuestas como heraldos veloces.
                    El <strong>TTL</strong> evita que un paquete vague eternamente por caminos perdidos.
                </p>
                <p>
                    <strong>Unicast</strong> habla a uno,
                    <strong>Broadcast</strong> proclama a todos,
                    y <strong>Multicast</strong> convoca solo a quienes desean escuchar.
                </p>
                <p>
                    Existen redes <strong>LAN</strong> en castillos pequeños,
                    <strong>WAN</strong> entre continentes,
                    <strong>MAN</strong> sobre ciudades enteras,
                    y <strong>PAN</strong> alrededor de una sola persona.
                </p>
                <p>
                    Las <strong>topologías</strong> describen la forma del reino:
                    estrella, anillo, bus o malla.
                    Los <strong>medios de transmisión</strong> son cobre, aire o fibra.
                    Y siempre se libra la batalla entre
                    <strong>ancho de banda</strong> (cuánto puede viajar)
                    y <strong>latencia</strong> (cuánto tarda en llegar).
                </p>
            </section>
        </main>
    </div>
</template>

<script>
export default {
    name: "BilboPage"
};
</script>

<style scoped>
.bilbo-page {
    background: #0f1419;
    color: #e8f4fd;
    min-height: 100vh;
    font-family: "EB Garamond", serif;
}

.hero-banner {
    margin-top: 53px;
}

.hero-banner img {
    width: 100%;
    display: block;
    object-fit: cover;
}

.content {
    padding-top: 45px;
    padding-bottom: 60px;
}

@media (max-width: 767px) {
    .hero-banner {
        margin-top: 52px;
    }

    .content {
        padding-top: 30px;
    }
}
</style>