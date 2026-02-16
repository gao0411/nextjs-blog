"use client";

import { useState, useEffect, useMemo } from "react";
import { Particles, initParticlesEngine } from "@tsparticles/react";
import { type ISourceOptions } from "@tsparticles/engine";
import { loadAll } from "@tsparticles/all";

export default function ParticlesContainer() {

    const [init, setInit] = useState(false);
    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadAll(engine);
        }).then(() => setInit(true));
    }, []);


    const options: ISourceOptions = useMemo(() => ({
        background: {
            color: {
                value: "#ffffff",
            },
        },
        fpsLimit: 60,
        particles: {
            bounce: {
                horizontal: {
                    value: 1,
                },
                vertical: {
                    value: 1,
                },
            },
            number: {
                value: 60,
            },
            color: {
                value: "#bdbdbd"
            },
            shape: {
                fill: true,
                type: "circle"
            },
            opacity: {
                value: 0.5,
                animation: {
                    enable: true,
                    speed: 1,
                    mode: "random",
                    sync: true,
                }
            },
            size: {
                value: 2,
                random: true,
                animation: {
                    enable: true,
                    speed: 1,
                    sync: true,
                },
            },
            links: {
                enable: true,
                blink: false,
                color: {
                    value: "#9d9d9d",
                },
                distance: 150,
                frequency: 1,
                opacity: 0.5,
            },
            move: {
                angel: {
                    offset: 0,
                    value: 90,
                },
                enable: true,
                speed: 1.5,
                direction: "none",
                random: false, // 不要随机方向（保持规律）
                straight: false,
                outModes: {
                    default: "bounce",
                },
                center: {
                    x: 50,
                    y: 50,
                    mode: "percent",
                    radius: 0,
                },
                decay: 0,
                distance: {},
                drift: 0,
            },
        },
        // 互动：鼠标悬停吸引
        interactivity: {
            detectsOn: "window",
            events: {
                onHover: {
                    enable: true,
                    mode: "grab",
                },
                onClick: {
                    enable: true,
                    mode: "push",
                },
            },
            modes: {
                grab: {
                    distance: 240,   // 影响半径
                    duration: 1,   // 持续时间（秒）
                    links: {
                        blink: false,
                        consent: false,
                        opacity: 1,
                    }
                },
                push: {
                    default: true,
                    quality: 4,
                    groups: [],
                    particles: {},
                },
                remove: {
                    quantity: 2,
                },
                attract: {
                    distance: 200,
                    duration: 0.4,
                    easing: "ease-out-quad",
                    factor: 1,
                    maxSpeed: 50,
                    speed: 1,
                },
                bounce: {
                    distance: 200,
                },
            },
        },
        detectRetina: true,
    }), []);
    if (init) {
        return (
            <Particles id="tsparticles" options={options} className="fixed -z-1" />
        )
    }

    return <></>
}