<template>
    <nav :class="headerClasses">
        <button
            type="button"
            class="secondary-menu-toggle"
            aria-label="Abrir navegacion secundaria"
            :aria-expanded="mobileMenuOpen.toString()"
            :class="{ active: mobileMenuOpen }"
            @click="toggleMobileMenu">
            <span></span>
            <span></span>
            <span></span>
        </button>

        <div class="container-fluid secondary-desktop-menu">
            <div class="row g-0 justify-content-center">
                <div v-for="item in items" :key="item.id" class="col-xl col-lg-3 col-md-4 col-sm-6 col-6">
                    <div :class="['sub-item', 'h-100', { active: itemActive(item) }]"
                        @click="handleItemClick(item)"
                        @mouseenter="handleItemEnter(item, $event)"
                        @mouseleave="handleItemLeave(item)">
                        <span class="sub-item-label">{{ item.name }}</span>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="mobileMenuOpen" class="secondary-mobile-menu">
            <div v-for="item in items" :key="item.id" class="secondary-mobile-section">
                <button
                    type="button"
                    :class="['secondary-mobile-item', { active: mobileItemActive(item) }]"
                    @click="handleMobileItemClick(item)">
                    <span>{{ item.name }}</span>
                    <span v-if="hasSubs(item)" class="secondary-mobile-arrow" :class="{ open: openMobileSections.includes(item.id) }">&#9662;</span>
                </button>
                <div v-if="hasSubs(item) && openMobileSections.includes(item.id)" class="secondary-mobile-subitems">
                    <template v-for="(sub, index) in item.subs" :key="subKey(sub, index)">
                        <router-link v-if="subRoute(sub)" :to="subRoute(sub)" @click="closeMobileMenu">
                            {{ subLabel(sub) }}
                        </router-link>
                        <a v-else href="#" @click.prevent="closeMobileMenu">
                            {{ subLabel(sub) }}
                        </a>
                    </template>
                </div>
            </div>
        </div>
    </nav>

    <div v-if="active && !mobileMenuOpen && currentSubs.length" :class="dropdownClasses"
        :style="{ top: dropdownTop + 'px', left: dropdownLeft + 'px', width: dropdownWidth + 'px' }"
        @mouseenter="cancelClose" @mouseleave="closeDropdownDelayed">
        <div class="submenu">
            <template v-for="(sub, index) in currentSubs" :key="subKey(sub, index)">
                <router-link v-if="subRoute(sub)" :to="subRoute(sub)" @click="closeDropdown">
                    {{ subLabel(sub) }}
                </router-link>
                <a v-else href="#">
                    {{ subLabel(sub) }}
                </a>
            </template>
        </div>
    </div>
</template>

<script>
export default {
    name: "ResponsiveSubheader",
    props: {
        items: {
            type: Array,
            required: true
        },
        theme: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            active: null,
            dropdownLeft: 0,
            dropdownTop: 0,
            dropdownWidth: 0,
            hideTimeout: null,
            mobileMenuOpen: false,
            openMobileSections: []
        };
    },
    computed: {
        currentSubs() {
            const found = this.items.find(i => i.id === this.active);
            return this.hasSubs(found) ? found.subs : [];
        },
        currentRouteName() {
            return this.$route?.name || "";
        },
        headerClasses() {
            return [
                "subheader",
                "responsive-subheader",
                "realm-subheader",
                `realm-subheader--${this.theme}`,
                `responsive-subheader--${this.theme}`
            ];
        },
        dropdownClasses() {
            return [
                "sub-dropdown",
                "responsive-sub-dropdown",
                "realm-sub-dropdown",
                `realm-subheader--${this.theme}`,
                `responsive-subheader--${this.theme}`
            ];
        }
    },
    methods: {
        hasSubs(item) {
            return Array.isArray(item?.subs) && item.subs.length > 0;
        },
        itemRoute(item) {
            if (!item || this.hasSubs(item)) {
                return null;
            }
            if (item.route) {
                return item.route;
            }
            if (item.routeName) {
                return { name: item.routeName };
            }
            return null;
        },
        itemRouteName(item) {
            if (!item) {
                return "";
            }
            if (item.routeName) {
                return item.routeName;
            }
            if (item.route && typeof item.route === "object") {
                return item.route.name || "";
            }
            return "";
        },
        itemActive(item) {
            const routeName = this.itemRouteName(item);
            return this.active === item.id || Boolean(routeName && routeName === this.currentRouteName);
        },
        mobileItemActive(item) {
            return this.hasSubs(item) ? this.openMobileSections.includes(item.id) : this.itemActive(item);
        },
        handleItemEnter(item, event) {
            if (this.hasSubs(item)) {
                this.openDropdown(item.id, event);
            }
        },
        handleItemLeave(item) {
            if (this.hasSubs(item)) {
                this.closeDropdownDelayed();
            }
        },
        handleItemClick(item) {
            const route = this.itemRoute(item);
            if (route) {
                this.pushItemRoute(route);
                this.closeDropdown();
            }
        },
        handleMobileItemClick(item) {
            if (this.hasSubs(item)) {
                this.toggleMobileSection(item.id);
                return;
            }

            const route = this.itemRoute(item);
            if (route) {
                this.pushItemRoute(route);
                this.closeMobileMenu();
            }
        },
        pushItemRoute(route) {
            const sameNamedRoute = typeof route === "object" && route.name && route.name === this.currentRouteName;
            const samePathRoute = typeof route === "string" && route === this.$route?.path;
            const sameObjectPathRoute = typeof route === "object" && route.path && route.path === this.$route?.path;
            if (!sameNamedRoute && !samePathRoute && !sameObjectPathRoute) {
                this.$router.push(route);
            }
        },
        openDropdown(id, event) {
            this.active = id;
            const rect = event.currentTarget.getBoundingClientRect();
            this.dropdownLeft = rect.left;
            this.dropdownTop = rect.bottom;
            this.dropdownWidth = rect.width;
            this.cancelClose();
        },
        closeDropdownDelayed() {
            this.hideTimeout = setTimeout(() => {
                this.active = null;
            }, 250);
        },
        cancelClose() {
            if (this.hideTimeout) {
                clearTimeout(this.hideTimeout);
                this.hideTimeout = null;
            }
        },
        toggleMobileMenu() {
            this.mobileMenuOpen = !this.mobileMenuOpen;
            if (this.mobileMenuOpen) {
                this.active = null;
                this.cancelClose();
            } else {
                this.openMobileSections = [];
            }
        },
        toggleMobileSection(id) {
            const index = this.openMobileSections.indexOf(id);
            if (index > -1) {
                this.openMobileSections.splice(index, 1);
            } else {
                this.openMobileSections = [id];
            }
        },
        subLabel(sub) {
            return sub && typeof sub === "object" ? sub.label : sub;
        },
        subRoute(sub) {
            return sub && typeof sub === "object" && sub.route ? sub.route : null;
        },
        subKey(sub, index) {
            return `${index}-${this.subLabel(sub)}`;
        },
        closeDropdown() {
            this.active = null;
            this.cancelClose();
        },
        closeMobileMenu() {
            this.mobileMenuOpen = false;
            this.openMobileSections = [];
        }
    }
};
</script>

<style scoped>
.subheader.responsive-subheader {
    position: fixed;
    top: 52px;
    left: 0;
    width: 100%;
    height: 54px;
    z-index: 2400;
    background:
        radial-gradient(circle at 18% 0%, color-mix(in srgb, var(--realm-accent) 20%, transparent), transparent 34%),
        linear-gradient(180deg, var(--realm-bg-top) 0%, var(--realm-bg-mid) 48%, var(--realm-bg-bottom) 100%);
    border-top: 1px solid color-mix(in srgb, var(--realm-accent) 20%, transparent);
    border-bottom: 2px solid var(--realm-border);
    box-shadow:
        0 8px 18px rgba(0, 0, 0, 0.46),
        0 0 22px color-mix(in srgb, var(--realm-glow) 54%, transparent),
        inset 0 1px 0 rgba(255, 255, 255, 0.035);
}

.secondary-desktop-menu,
.secondary-desktop-menu > .row,
.secondary-desktop-menu > .row > [class*="col"] {
    height: 100%;
    min-width: 0;
}

.secondary-desktop-menu {
    padding-left: clamp(6px, 1vw, 12px);
    padding-right: clamp(6px, 1vw, 12px);
}

.subheader.responsive-subheader::before {
    content: "";
    position: absolute;
    inset: 0;
    pointer-events: none;
    background:
        linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.06) 48%, transparent 100%),
        linear-gradient(180deg, rgba(255, 255, 255, 0.04), transparent 42%);
    opacity: 0.42;
}

.sub-item {
    height: 100%;
    min-height: 52px;
    min-width: 0;
    padding: 6px 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    white-space: normal;
    overflow: hidden;
    line-height: 1.12;
    color: var(--realm-text);
    font-family: "Cinzel", serif;
    font-size: clamp(10.5px, calc(0.38vw + 7px), 12.5px);
    font-weight: 600;
    letter-spacing: 0.15px;
    cursor: pointer;
    border-left: 1px solid color-mix(in srgb, var(--realm-border) 28%, transparent);
    border-right: 1px solid color-mix(in srgb, var(--realm-border) 28%, transparent);
    text-shadow: 0 1px 8px rgba(0, 0, 0, 0.34);
    transition:
        background 0.22s ease,
        color 0.22s ease,
        box-shadow 0.22s ease,
        transform 0.22s ease;
    position: relative;
}

.sub-item-label {
    display: -webkit-box;
    width: 100%;
    max-height: calc(1.12em * 3);
    overflow: hidden;
    overflow-wrap: anywhere;
    text-wrap: balance;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
}

.sub-item:hover,
.sub-item.active {
    background:
        linear-gradient(180deg, color-mix(in srgb, var(--realm-hover) 88%, #ffffff 4%), var(--realm-hover));
    color: var(--realm-text-strong);
    transform: translateY(-1px);
    box-shadow:
        0 12px 24px rgba(0, 0, 0, 0.18),
        inset 0 0 18px var(--realm-glow),
        inset 0 1px 0 rgba(255, 255, 255, 0.05);
}

.sub-item::after {
    content: "";
    position: absolute;
    bottom: -2px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 2px;
    background: linear-gradient(90deg,
            transparent 0%,
            var(--realm-accent) 20%,
            var(--realm-accent-strong) 50%,
            var(--realm-accent) 80%,
            transparent 100%);
    box-shadow:
        0 0 8px color-mix(in srgb, var(--realm-accent) 68%, transparent),
        0 0 18px color-mix(in srgb, var(--realm-accent-strong) 28%, transparent);
    transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    border-radius: 1px;
}

.sub-item:hover::after,
.sub-item.active::after {
    width: 95%;
    bottom: -1px;
}

.sub-dropdown.responsive-sub-dropdown {
    position: fixed;
    max-height: 72vh;
    overflow-y: auto;
    background:
        radial-gradient(circle at 20% 0%, color-mix(in srgb, var(--realm-accent) 16%, transparent), transparent 34%),
        linear-gradient(180deg, var(--realm-dropdown-top) 0%, var(--realm-dropdown-bottom) 100%);
    border-left: 1px solid color-mix(in srgb, var(--realm-accent) 30%, transparent);
    border-right: 1px solid color-mix(in srgb, var(--realm-accent) 30%, transparent);
    border-bottom: 1px solid color-mix(in srgb, var(--realm-accent) 30%, transparent);
    border-radius: 0 0 6px 6px;
    padding: 14px 14px;
    z-index: 2600;
    box-shadow:
        0 18px 30px rgba(0, 0, 0, 0.52),
        0 0 42px color-mix(in srgb, var(--realm-glow) 44%, transparent),
        inset 0 1px 0 rgba(255, 255, 255, 0.035);
    animation: dropdownFade 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    backdrop-filter: blur(4px);
}

.submenu,
.secondary-mobile-subitems {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.submenu a,
.secondary-mobile-subitems a {
    color: var(--realm-text);
    text-decoration: none;
    font-family: "Cinzel", serif;
    font-size: 13px;
    line-height: 1.35;
    padding: 6px 2px;
    border-bottom: 1px solid color-mix(in srgb, var(--realm-accent) 12%, transparent);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    cursor: pointer;
}

.submenu a:hover,
.secondary-mobile-subitems a:hover {
    color: var(--realm-accent-strong);
    transform: translateX(3px);
    text-shadow: 0 0 12px var(--realm-glow);
}

.submenu a:last-child,
.secondary-mobile-subitems a:last-child {
    border-bottom: none;
}

.sub-dropdown::-webkit-scrollbar,
.secondary-mobile-menu::-webkit-scrollbar {
    width: 8px;
}

.sub-dropdown::-webkit-scrollbar-thumb,
.secondary-mobile-menu::-webkit-scrollbar-thumb {
    background: color-mix(in srgb, var(--realm-accent) 42%, transparent);
    border-radius: 10px;
}

.secondary-menu-toggle {
    display: none;
    flex-direction: column;
    justify-content: space-between;
    width: 28px;
    height: 20px;
    padding: 0;
    border: 0;
    background: transparent;
    cursor: pointer;
    z-index: 2402;
}

.secondary-menu-toggle span {
    width: 100%;
    height: 2px;
    border-radius: 999px;
    background: var(--realm-accent-strong);
    box-shadow: 0 0 10px var(--realm-glow);
    transition: all 0.3s ease;
}

.secondary-menu-toggle.active span:nth-child(1) {
    transform: rotate(45deg) translate(6px, 6px);
}

.secondary-menu-toggle.active span:nth-child(2) {
    opacity: 0;
}

.secondary-menu-toggle.active span:nth-child(3) {
    transform: rotate(-45deg) translate(7px, -7px);
}

.secondary-mobile-menu {
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    max-height: calc(100vh - 108px);
    overflow-y: auto;
    background:
        radial-gradient(circle at 18% 0%, color-mix(in srgb, var(--realm-accent) 16%, transparent), transparent 35%),
        linear-gradient(180deg, var(--realm-bg-mid), var(--realm-bg-bottom));
    border-bottom: 1px solid color-mix(in srgb, var(--realm-accent) 30%, transparent);
    box-shadow:
        0 18px 30px rgba(0, 0, 0, 0.50),
        0 0 32px color-mix(in srgb, var(--realm-glow) 45%, transparent);
}

.secondary-mobile-section {
    border-bottom: 1px solid color-mix(in srgb, var(--realm-accent) 16%, transparent);
}

.secondary-mobile-item {
    width: 100%;
    min-height: 52px;
    padding: 14px 18px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    border: 0;
    background: transparent;
    color: var(--realm-text);
    font-family: "Cinzel", serif;
    font-size: 13px;
    font-weight: 600;
    line-height: 1.3;
    text-align: left;
    cursor: pointer;
    transition: all 0.22s ease;
}

.secondary-mobile-item:hover,
.secondary-mobile-item.active {
    background: color-mix(in srgb, var(--realm-hover) 78%, transparent);
    color: var(--realm-text-strong);
}

.secondary-mobile-arrow {
    flex: 0 0 auto;
    color: var(--realm-accent-strong);
    transition: transform 0.25s ease;
}

.secondary-mobile-arrow.open {
    transform: rotate(180deg);
}

.secondary-mobile-subitems {
    padding: 0 18px 14px 30px;
    background: rgba(0, 0, 0, 0.18);
}

@keyframes dropdownFade {
    from {
        opacity: 0;
        transform: translateY(-8px) scale(0.98);
        filter: blur(1px);
    }

    to {
        opacity: 1;
        transform: translateY(0) scale(1);
        filter: blur(0);
    }
}

@media (max-width: 1199px) {
    .subheader.responsive-subheader {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        padding: 0 12px;
    }

    .secondary-desktop-menu {
        display: none;
    }

    .secondary-menu-toggle {
        display: flex;
    }

    .secondary-mobile-menu {
        display: block;
    }

    .sub-dropdown.responsive-sub-dropdown {
        display: none;
    }
}
</style>
