<template>
    <nav class="subheader">
        <div class="container-fluid px-4 px-xl-5">
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
    </nav>
</template>

<script>
import { thorondorHeaderItems } from "@/features/vueloThorondor/data/thorondorHeaderItems";

export default {
    name: "HeaderThorondor",

    data() {
        return {
            items: thorondorHeaderItems
        };
    },

    computed: {
        activeRouteName() {
            return this.$route?.name || "";
        }
    },

    methods: {
        goTo(routeName) {
            if (this.activeRouteName === routeName) return;
            this.$router.push({ name: routeName });
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

@media (max-width: 1199px) {
    .sub-item {
        padding: 12px 14px;
        font-size: 11.5px;
        min-height: 58px;
    }
}

@media (max-width: 767px) {
    .subheader {
        display: none;
    }
}
</style>
