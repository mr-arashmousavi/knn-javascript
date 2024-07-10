"use client";

import type { Selection } from "@nextui-org/react";

import React, { PropsWithChildren } from "react";
import {
    Button,
    Select,
    SelectItem,
    SelectSection,
    Slider,
    Textarea,
    Popover,
    PopoverTrigger,
    PopoverContent,
    Divider,
} from "@nextui-org/react";
import { Icon } from "@iconify/react";


type Preset = {
    id: string;
    name: string;
};

const presets: Preset[] = [
    {
        id: "1",
        name: "Preset 1",
    },
    {
        id: "2",
        name: "Preset 2",
    },
    {
        id: "3",
        name: "Preset 3",
    },
    {
        id: "4",
        name: "Preset 4",
    },
    {
        id: "5",
        name: "Preset 5",
    },
    {
        id: "6",
        name: "Preset 6",
    },
    {
        id: "7",
        name: "Preset 7",
    },
    {
        id: "8",
        name: "Preset 8",
    },
    {
        id: "9",
        name: "Preset 9",
    },
    {
        id: "10",
        name: "Preset 10",
    },
];

const DEFAULT_MODELS = [
    "gpt-4",
    "gpt-3.5-turbo",
    "gpt-3.5-turbo-16k",
    "babbage-002",
    "davinci-002",
];

const fineTuneModels = [
    "personal::gpt-3",
    "personal::gpt-3-16k",
    "personal::gpt-3-16k-2",
    "personal::gpt-3-16k-3",
    "personal::gpt-3-16k-4",
    "personal::gpt-3-16k-5",
];

export default function DashboardLayout({ children }: PropsWithChildren) {
    const [selectedPreset, setSelectedPreset] = React.useState<Preset | null>(null);
    const [selectedModel, setSelectedModel] = React.useState<React.Key | null>("gpt-4");
    const [systemMessage, setSystemMessage] = React.useState<string>("");
    const [temperature, setTemperature] = React.useState<number>(0.5);
    const [minLength, setMinLength] = React.useState<number>(1);
    const [topP, setTopP] = React.useState<number>(0.5);
    const [frequencyPenalty, setFrequencyPenalty] = React.useState<number>(0);
    const [presencePenalty, setPresencePenalty] = React.useState<number>(0);
    const [value, setValue] = React.useState(25);

    const [minBounciness, setMinBounciness] = React.useState<number>(1);


    const controlsContent = (
        <>
            <div className="flex gap-2 items-center" >
                <Icon icon="oui:controls-horizontal" className="w-8 h-8" />
                <h1 className="text-xl font-bold">Model Control</h1>

            </div>
            <div className="mt-2 flex w-full flex-col gap-6 bg-zinc-700 p-5 rounded-xl">
                <div className="flex flex-col gap-2 w-full h-full max-w-md items-start justify-center">
                    <Slider
                        label="Ball size"
                        step={1}
                        minValue={16}
                        maxValue={30}
                        defaultValue={16}
                        size="sm"
                        className="max-w-md"
                    />
                </div>

            </div>
            <div className="mt-2 flex w-full flex-col gap-6 bg-zinc-700 p-5 rounded-xl">
                <div className="flex flex-col gap-2 w-full h-full max-w-md items-start justify-center">
                    <Slider

                        label="Range of Ball Bounciness"
                        maxValue={1.0}
                        minValue={0.0}
                        size="sm"
                        step={0.01}
                        defaultValue={[0.5, 0.55]}
                    />
                </div>

            </div>
            <div className="mt-2 flex w-full flex-col gap-6 bg-zinc-700 p-5 rounded-xl">
                <div className="flex flex-col gap-2 w-full h-full max-w-md items-start justify-center">
                    <Slider
                        label="Number of drops"
                        maxValue={100}
                        minValue={1}
                        size="sm"
                        step={1}
                        defaultValue={1}
                    />
                    <Slider
                        label="Drops position"
                        maxValue={500}
                        minValue={10}
                        size="sm"
                        step={10}
                        defaultValue={300}
                    />
                    {/* <p className="text-default-500 font-medium text-small">Drop a Bunch at a Single Spot</p> */}
                    <Button color="primary" variant="solid">
                        Drop
                    </Button>
                </div>

            </div>

            <div className="flex flex-col gap-5">
                <span className="text-xl font-medium">Actions</span>
                <div className="flex gap-2 items-center">
                    <Button color="primary" variant="solid">
                        Analyze !
                    </Button>
                    <Button color="warning" variant="solid">
                        Reset
                    </Button>
                </div>
            </div>
        </>
    );

    return (
        <div className="h-full w-full">
            <section className="hidden lg:flex h-full w-[20vw] bg-zinc-800 p-5 rounded-2xl">
                <div className="hidden w-full flex-none flex-col gap-4 lg:flex">{controlsContent}</div>
            </section>
            <main className="w-full">
                {children}
            </main>
        </div>
    );
}
