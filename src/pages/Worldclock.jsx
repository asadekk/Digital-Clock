import { useEffect, useState } from "react";
import "../App.css";

const ALL_TIMEZONES = Intl.supportedValuesOf
  ? Intl.supportedValuesOf("timeZone")
  : [
      "Africa/Lagos",
      "America/New_York",
      "Asia/Tashkent",
      "Europe/London",
      "Europe/Paris",
    ];

function Worldclock() {
  const [timezones] = useState(ALL_TIMEZONES);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState("Asia/Tashkent");
  const [time, setTime] = useState("");

  useEffect(() => {
    if (!selected) return;

    const updateClock = () => {
      try {
        const currentTime = new Date().toLocaleTimeString("en-US", {
          timeZone: selected,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        });

        setTime(currentTime);
      } catch (e) {
        setTime("--:--:--");
      }
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);

    return () => clearInterval(interval);
  }, [selected]);

  const filtered = timezones.filter((tz) =>
    tz.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="worldclock">
      <h1 className="title">🌍 World Clock</h1>

      <input
        className="search-input"
        type="text"
        placeholder="Davlat nomi..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="timezone-list">
        {filtered.length > 0 ? (
          filtered.map((tz) => (
            <div
              key={tz}
              className={`timezone-item ${
                selected === tz ? "active" : ""
              }`}
              onClick={() => setSelected(tz)}
            >
              {tz.replace("_", " ")}
            </div>
          ))
        ) : (
          <div className="not-found">Bunday hudud topilmadi</div>
        )}
      </div>

      <div className="clock-panel">
        <h3 className="timezone-name">
          {selected.split("/")[1]?.replace("_", " ") || selected}
          <span className="region">
            {" "}
            ({selected.split("/")[0]})
          </span>
        </h3>

        <h1 className="clock-time">
          {time || "--:--:--"}
        </h1>
      </div>
    </div>
  );
}

export default Worldclock;