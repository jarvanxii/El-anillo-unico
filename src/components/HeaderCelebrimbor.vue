<template>
    <nav class="subheader">
        <div class="container-fluid px-4 px-xl-5">
            <div class="row g-0 justify-content-center">
                <div v-for="item in subItems" :key="item.id" class="col-xl col-lg-3 col-md-4 col-sm-6 col-6">
                    <div :class="['sub-item', 'h-100', { active: active === item.id }]"
                        @mouseenter="openDropdown(item.id, $event)" @mouseleave="closeDropdownDelayed">
                        {{ item.name }}
                    </div>
                </div>
            </div>
        </div>
    </nav>
    <div v-if="active" class="sub-dropdown"
        :style="{ top: dropdownTop + 'px', left: dropdownLeft + 'px', width: dropdownWidth + 'px' }"
        @mouseenter="cancelClose" @mouseleave="closeDropdownDelayed">
        <div class="submenu">
            <a v-for="(sub, index) in currentSubs" :key="index" href="#">
                {{ sub }}
            </a>
        </div>
    </div>
</template>

<script>
export default {
    name: 'HeaderCelebrimbor',
    data() {
        return {
            active: null,
            dropdownLeft: 0,
            dropdownTop: 0,
            dropdownWidth: 0,
            hideTimeout: null,
            subItems: [
                {
                    id: "recon_osint",
                    name: "OSINT y Reconocimiento",
                    subs: [
                        "Maltego",
                        "theHarvester",
                        "SpiderFoot",
                        "Shodan",
                        "Censys",
                        "Recon-ng",
                        "Amass",
                        "Subfinder",
                        "Google Dorks",
                        "Whois Lookup",
                        "DNSDumpster",
                        "Wayback Machine",
                        "FOCA",
                        "ExifTool",
                        "GHunt"
                    ]
                },
                {
                    id: "pentest_redteam",
                    name: "Pentesting / Red Team",
                    subs: [
                        "Nmap",
                        "Masscan",
                        "Metasploit",
                        "Burp Suite",
                        "OWASP ZAP",
                        "sqlmap",
                        "Hydra",
                        "John the Ripper",
                        "Hashcat",
                        "Gobuster",
                        "Dirsearch",
                        "Nikto",
                        "Impacket",
                        "Responder",
                        "BloodHound",
                        "CrackMapExec / NetExec"
                    ]
                },
                {
                    id: "wireless_mobile",
                    name: "Wireless y Mobile",
                    subs: [
                        "Aircrack-ng",
                        "Kismet",
                        "Wifite",
                        "Bettercap",
                        "Reaver",
                        "ADB",
                        "MobSF",
                        "Frida",
                        "Objection",
                        "APKTool",
                        "jadx",
                        "Burp para Android/iOS"
                    ]
                },
                {
                    id: "blue_team_defense",
                    name: "Blue Team / Defensa",
                    subs: [
                        "Wireshark",
                        "tcpdump",
                        "Snort",
                        "Suricata",
                        "Zeek",
                        "Wazuh",
                        "OSSEC",
                        "YARA",
                        "Sigma Rules",
                        "Velociraptor",
                        "Sysmon",
                        "OpenVAS / Greenbone",
                        "Nessus",
                        "Fail2ban",
                        "CrowdSec"
                    ]
                },
                {
                    id: "forensics_ir",
                    name: "Forense e Incident Response",
                    subs: [
                        "Autopsy",
                        "Volatility",
                        "FTK Imager",
                        "KAPE",
                        "Plaso / log2timeline",
                        "Redline",
                        "Magnet RAM Capture",
                        "Disk Drill",
                        "Binwalk",
                        "CyberChef",
                        "HxD",
                        "Process Monitor",
                        "Process Explorer"
                    ]
                },
                {
                    id: "cloud_devsecops",
                    name: "Cloud / DevSecOps",
                    subs: [
                        "Trivy",
                        "Snyk",
                        "SonarQube",
                        "Semgrep",
                        "OWASP Dependency Check",
                        "Gitleaks",
                        "Checkov",
                        "tfsec",
                        "ScoutSuite",
                        "Prowler",
                        "kube-bench",
                        "kube-hunter",
                        "Docker Bench Security",
                        "GitGuardian"
                    ]
                },
                {
                    id: "privacy_anonymity",
                    name: "Privacidad y Anonimato",
                    subs: [
                        "Tor Browser",
                        "Tails",
                        "Whonix",
                        "Qubes OS",
                        "Mullvad VPN",
                        "ProtonVPN",
                        "IVPN",
                        "VeraCrypt",
                        "Cryptomator",
                        "KeePassXC",
                        "Bitwarden",
                        "uBlock Origin",
                        "Privacy Badger",
                        "LibreWolf",
                        "Brave Browser"
                    ]
                }
            ]
        };
    },
    computed: {
        currentSubs() {
            const found = this.subItems.find(i => i.id === this.active);
            return found ? found.subs : [];
        }
    },
    methods: {
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
        }
    }
}
</script>

<style scoped>
.subheader {
    position: fixed;
    top: 52px;
    left: 0;
    width: 100%;
    z-index: 2400;
    background: #12161e;
    border-top: 1px solid rgba(255, 214, 102, 0.08);
    border-bottom: 2px solid #c8a96a;
    box-shadow: 0 8px 18px rgba(0, 0, 0, 0.45);
}

.sub-item {
    min-height: 54px;
    padding: 12px 26px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    white-space: normal;
    line-height: 1.25;
    color: #e6d3a3;
    font-family: "Cinzel", serif;
    font-size: 13px;
    font-weight: 600;
    letter-spacing: .3px;
    cursor: pointer;
    border-left: 1px solid rgba(200, 169, 106, 0.18);
    border-right: 1px solid rgba(200, 169, 106, 0.18);
    transition: all .22s ease;
    position: relative;
}

.sub-item:hover,
.sub-item.active {
    background: #1b1813;
    color: #f3cf75;
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.16), inset 0 0 18px rgba(212, 175, 55, 0.14);
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
            #d4af37 20%,
            #ffd700 50%,
            #d4af37 80%,
            transparent 100%);
    box-shadow: 0 0 8px rgba(212, 175, 55, 0.6), 0 0 16px rgba(255, 215, 0, 0.3);
    transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    border-radius: 1px;
}

.sub-item:hover::after,
.sub-item.active::after {
    width: 95%;
    bottom: -1px;
}

.sub-dropdown {
    position: fixed;
    max-height: 72vh;
    overflow-y: auto;
    background: linear-gradient(180deg, #141414 0%, #0f0f0f 100%);
    border-left: 1px solid rgba(255, 214, 102, 0.22);
    border-right: 1px solid rgba(255, 214, 102, 0.22);
    border-bottom: 1px solid rgba(255, 214, 102, 0.22);
    border-radius: 0 0 6px 6px;
    padding: 14px 14px;
    z-index: 2600;
    box-shadow:
        0 18px 30px rgba(0, 0, 0, 0.50),
        0 0 40px rgba(200, 169, 106, 0.08),
        inset 0 1px 0 rgba(255, 220, 120, 0.03);
    animation: dropdownFade 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    backdrop-filter: blur(1px);
}

.submenu {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.submenu a {
    color: #f3e7c2;
    text-decoration: none;
    font-family: "Cinzel", serif;
    font-size: 13px;
    line-height: 1.35;
    padding: 6px 2px;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    cursor: pointer;
}

.submenu a:hover {
    color: #ffd98e;
    font-family: "Cinzel", serif;
    transform: translateX(1px);
}

.sub-dropdown::-webkit-scrollbar {
    width: 8px;
}

.sub-dropdown::-webkit-scrollbar-thumb {
    background: rgba(200, 169, 106, 0.35);
    border-radius: 10px;
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
    .sub-item {
        padding: 12px 18px;
        font-size: 12px;
        min-height: 58px;
    }
}

@media (max-width: 767px) {
    .subheader {
        display: none;
    }
}
</style>