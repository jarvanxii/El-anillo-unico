<template>
    <nav class="subheader" ref="subheader">
        <div class="subheader-container">
            <!-- Logo/Nombre para móvil -->
            <div class="subheader-title">Thorondor</div>
            
            <!-- Hamburguesa para móvil -->
            <button class="mobile-menu-toggle" @click="toggleMobileMenu" :class="{ active: mobileMenuOpen }">
                <span></span>
                <span></span>
                <span></span>
            </button>
            
            <!-- Menú desktop -->
            <div class="container-fluid px-4 px-xl-5 desktop-menu">
                <div class="row g-0 justify-content-center">
                    <div
                        v-for="item in items"
                        :key="item.id"
                        class="col-xl col-lg-3 col-md-4 col-sm-6 col-6"
                    >
                        <button
                            type="button"
                            :class="['sub-item', 'h-100', { active: activeRouteName === item.routeName }]"
                            @click="goTo(item.routeName)"
                        >
                            {{ item.name }}
                        </button>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Submenú móvil -->
        <div v-if="mobileMenuOpen" class="mobile-submenu">
            <div v-for="item in items" :key="item.id" class="mobile-item">
                <button
                    type="button"
                    :class="['mobile-sub-item', { active: activeRouteName === item.routeName }]"
                    @click="goTo(item.routeName)"
                >
                    {{ item.name }}
                </button>
            </div>
        </div>
    </nav>
</template>

<script>
import { thorondorHeaderItems } from "@/features/vueloThorondor/data/thorondorHeaderItems";

export default {
    name: "HeaderThorondor",

    data() {
        return {
            items: thorondorHeaderItems,
            mobileMenuOpen: false
        };
    },

    computed: {
        activeRouteName() {
            return this.$route?.name || "";
        }
    },

    methods: {
        toggleMobileMenu() {
            this.mobileMenuOpen = !this.mobileMenuOpen;
        },
        
        goTo(routeName) {
            if (this.activeRouteName === routeName) return;
            this.$router.push({ name: routeName });
            this.mobileMenuOpen = false;
        }
    }
};
</script>

<style scoped>
.subheader {
    position: fixed;
    top: 52px;
    left: 0;
    width: 100%;
    z-index: 2400;
    background:
        linear-gradient(180deg, #0e1828 0%, #0d1422 55%, #0b121c 100%);
    border-top: 1px solid rgba(125, 211, 252, 0.12);
    border-bottom: 1px solid rgba(56, 189, 248, 0.34);
    box-shadow:
        0 8px 18px rgba(0, 0, 0, 0.45),
        inset 0 1px 0 rgba(125, 211, 252, 0.05);
}

.subheader-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 16px;
    height: 54px;
}

.subheader-title {
    color: #dbeafe;
    font-family: "Cinzel", serif;
    font-size: 16px;
    font-weight: 600;
    letter-spacing: 0.3px;
}

.desktop-menu {
    flex: 1;
    display: flex;
    justify-content: center;
}

.sub-item {
    width: 100%;
    min-height: 54px;
    padding: 12px 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    white-space: normal;
    line-height: 1.25;
    color: #dbeafe;
    font-family: "Cinzel", serif;
    font-size: 12.5px;
    font-weight: 600;
    letter-spacing: 0.3px;
    cursor: pointer;
    border: 0;
    border-left: 1px solid rgba(125, 211, 252, 0.12);
    border-right: 1px solid rgba(125, 211, 252, 0.12);
    background: transparent;
    transition: all 0.22s ease;
    position: relative;
}

.sub-item:hover,
.sub-item.active {
    background:
        linear-gradient(180deg, rgba(15, 23, 42, 0.96), rgba(12, 20, 34, 0.98));
    color: #f8fbff;
    box-shadow:
        inset 0 0 18px rgba(56, 189, 248, 0.12),
        0 8px 18px rgba(2, 6, 23, 0.18);
}

.sub-item::after {
    content: "";
    position: absolute;
    bottom: -1px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 2px;
    background: linear-gradient(
        90deg,
        transparent 0%,
        #7dd3fc 20%,
        #38bdf8 50%,
        #7dd3fc 80%,
        transparent 100%
    );
    box-shadow:
        0 0 8px rgba(56, 189, 248, 0.55),
        0 0 16px rgba(14, 165, 233, 0.24);
    transition: all 0.35s ease;
    border-radius: 999px;
}

.sub-item:hover::after,
.sub-item.active::after {
    width: 92%;
}

/* Hamburguesa móvil para Thorondor */
.mobile-menu-toggle {
    display: none;
    flex-direction: column;
    justify-content: space-between;
    width: 24px;
    height: 18px;
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 0;
    z-index: 2401;
}

.mobile-menu-toggle span {
    width: 100%;
    height: 2px;
    background: #7dd3fc;
    border-radius: 2px;
    transition: all 0.3s ease;
}

.mobile-menu-toggle.active span:nth-child(1) {
    transform: rotate(45deg) translate(5px, 5px);
}

.mobile-menu-toggle.active span:nth-child(2) {
    opacity: 0;
}

.mobile-menu-toggle.active span:nth-child(3) {
    transform: rotate(-45deg) translate(7px, -6px);
}

/* Submenú móvil para Thorondor */
.mobile-submenu {
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: linear-gradient(180deg, #0e1828 0%, #0d1422 55%, #0b121c 100%);
    border-bottom: 1px solid rgba(56, 189, 248, 0.34);
    box-shadow: 0 8px 18px rgba(0, 0, 0, 0.45);
    z-index: 2400;
    max-height: calc(100vh - 106px);
    overflow-y: auto;
}

.mobile-item {
    border-bottom: 1px solid rgba(56, 189, 248, 0.15);
}

.mobile-sub-item {
    width: 100%;
    padding: 16px 20px;
    display: flex;
    align-items: center;
    text-align: left;
    color: #dbeafe;
    font-family: "Cinzel", serif;
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 0.3px;
    cursor: pointer;
    border: 0;
    background: transparent;
    transition: all 0.3s ease;
}

.mobile-sub-item:hover,
.mobile-sub-item.active {
    background: rgba(56, 189, 248, 0.1);
    color: #f8fbff;
}

@media (max-width: 1199px) {
    .sub-item {
        padding: 12px 14px;
        font-size: 11.5px;
        min-height: 58px;
    }
}

@media (max-width: 767px) {
    .desktop-menu {
        display: none;
    }
    
    .mobile-menu-toggle {
        display: flex;
    }
    
    .mobile-submenu {
        display: block;
    }
    
    .subheader-container {
        padding: 0 16px;
    }
}
</style>
