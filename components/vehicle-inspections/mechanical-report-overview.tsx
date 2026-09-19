const reportSections = [
  {
    title: "Engine & cooling system",
    detail: "Oil and coolant condition and levels, visible leaks, belts and hoses, engine mounts, timing-drive noise and engine performance under load where applicable.",
  },
  {
    title: "Gearbox & drivetrain",
    detail: "Gearbox and clutch operation where fitted, gear changes, mounts, driveshafts and CV joints, with findings on unusual noise, vibration and driving behaviour.",
  },
  {
    title: "Brakes, steering & suspension",
    detail: "Accessible pads, discs, calipers and brake lines; parking brake, steering, suspension components, dampers, joints and bushes; wheel and tyre condition.",
  },
  {
    title: "Diagnostics & electrical systems",
    detail: "Full-system scan for available fault codes and warnings, plus 12V battery and charging checks. EV and hybrid inspections include relevant powertrain, charging and battery-management checks where supported.",
  },
  {
    title: "Road-test findings",
    detail: "How the car accelerates, changes gear, brakes, steers and handles, including unusual noises and vibration. Premium includes an extended road test. Road tests depend on safety and permission.",
  },
  {
    title: "Evidence, priorities & buying advice",
    detail: "Written findings, photos and a clear video review explain the issues observed and what needs attention. A personal call helps you understand the concerns and decide what to ask before buying.",
  },
]

export function MechanicalReportOverview() {
  return (
    <section className="border-b border-border bg-white py-8 sm:py-12">
      <div className="container mx-auto max-w-5xl px-4">
        <div className="mx-auto mb-6 max-w-3xl text-center">
          <p className="text-sm font-bold text-primary">Included in Standard and Premium</p>
          <h2 className="mt-2 text-2xl font-bold sm:text-4xl">What your mechanical report covers</h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            An in-depth mechanical inspection brings the physical checks, diagnostic results and driving behaviour together. Your report explains the condition we found, the concerns and their significance for your purchase.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {reportSections.map(({ title, detail }) => (
            <div key={title} className="rounded-2xl border border-primary/15 bg-primary/5 p-5">
              <h3 className="font-bold text-foreground">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{detail}</p>
            </div>
          ))}
        </div>
        <p className="mx-auto mt-5 max-w-3xl text-center text-sm leading-relaxed text-muted-foreground">
          Checks are adapted to the vehicle and accessible components. The report records any checks that could not be completed. Both packages also include bodywork, interior, vehicle history, and seller identity and document checks with the seller&apos;s cooperation. Keep the video, photos and report as evidence of the issues observed at the time.
        </p>
      </div>
    </section>
  )
}
