import { chairColors, cushionColors, useCustomization } from "../contexts/Customization";

const Configurator = () => {
    const {material, setMaterial, legs, setLegs, chairColor, setChairColor, cushionColor, setCushionColor} = useCustomization(); //use hook
    console.log("material", material);

    return (
        <div className="configurator">
            <div className="configurator_section">
                <div className="configurator_section_title">
                    Chair material
                </div>
                <div className="configurator_section_values">
                    <div className={`item ${material === "leather" ? "item--active" : ""}`} onClick={() => setMaterial('leather')}>
                        <div className="item_label">
                            Leather
                        </div>
                    </div>
                    <div className={`item ${material === "fabric" ? "item--active" : ""}`} onClick={() => setMaterial('fabric')}>
                        <div className="item_label">
                            fabric
                        </div>
                    </div>
                </div>
            </div>
            <div className="configurator_section">
                <div className="configurator_section_title">
                    ChairColor
                </div>
                <div className="configurator_section_values">
                    {chairColors.map((item, index) => (
                        <div
                            key={index}
                            className={`item ${item.color === chairColor.color ? "item--active" : ""}`} onClick={() => setChairColor(item)}
                        >
                            <div className="item_dot" style={{
                                backgroundColor: item.color,
                            }}
                            />
                            <div className="item_label"> {item.name}</div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="configurator_section">
                <div className="configurator_section_title">
                    Cushion Color
                </div>
                <div className="configurator_section_values">
                    {cushionColors.map((item, index) => (
                        <div
                            key={index}
                            className={`item ${item.color === cushionColor.color ? "item--active" : ""}`} onClick={() => setCushionColor(item)}
                        >
                            <div className="item_dot" style={{
                                backgroundColor: item.color,
                            }}
                            />
                            <div className="item_label"> {item.name}</div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="configurator_section">
                <div className="configurator_section_title">
                    Legs
                </div>
                <div className="configurator_section_values">
                    <div className={`item ${legs === 1 ? "item--active" : ""}`} onClick={() => setLegs(1)}>
                        <div className="item_label">
                            Modern
                        </div>
                    </div>
                    <div className={`item ${legs === 2 ? "item--active" : ""}`} onClick={() => setLegs(2)}>
                        <div className="item_label">
                            Classic
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Configurator;