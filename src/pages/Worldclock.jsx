import { useEffect, useState } from "react";

// Brauzerning o'zidan dunyodagi barcha rasmiy vaqt zonalarini avtomatik olish
const ALL_TIMEZONES = Intl.supportedValuesOf ? Intl.supportedValuesOf("timeZone") : [
  "Africa/Lagos", "America/New_York", "Asia/Tashkent", "Europe/London", "Europe/Paris"
];

function Worldclock() {
  const [timezones] = useState(ALL_TIMEZONES);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState("Asia/Tashkent"); // Standart boshlang'ich zona
  const [time, setTime] = useState("");

  // Soatni har soniyada yangilash
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
        // Agar eski brauzerlarda ayrim zonalar qo'llab-quvvatlanmasa xato bermasligi uchun
        setTime("--:--:--");
      }
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);

    return () => clearInterval(interval);
  }, [selected]);

  // Qidiruv filtri (Katta-kichik harflarni farqlamaydi)
  const filtered = timezones.filter((tz) =>
    tz.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h1>🌍 World Clock</h1>

      {/* QIDIRUV INPUTI */}
      <input
        placeholder="davlat nomi"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* RO'YXAT (Scroller bilan) */}
      <div style={{width:"200px",height:"200px",overflow:'auto'}}>
        {filtered.length > 0 ? (
          filtered.map((tz) => (
            <div 
              key={tz}
              onClick={() => setSelected(tz)}
            >
              {tz.replace("_", " ")}
            </div>
          ))
        ) : (
          <div>Bunday hudud topilmadi</div>
        )}
      </div>

      {/* JONLI SOAT PANELI */}
      <div>
        <h3>
          {selected.split("/")[1]?.replace("_", " ") || selected} ({selected.split("/")[0]})
        </h3>
        <h1>
          {time || "--:--:--"}
        </h1>
      </div>
    </div>
  );
}

export default Worldclock;