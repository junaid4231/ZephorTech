"use client";

import React, { useState } from "react";

const roles = [
  { value: "bd", label: "Business Development (BD)", priority: true },
  { value: "smm", label: "Social Media Manager", priority: true },
  { value: "web", label: "Web Developer", priority: false },
  { value: "app", label: "App Developer", priority: false },
];

const semesters = [
  "1st – 2nd Semester",
  "3rd – 4th Semester",
  "5th – 6th Semester",
  "7th – 8th Semester",
  "Graduate / Fresh Graduate",
];

const startOptions = [
  "Immediately",
  "Within 2 weeks",
  "Within a month",
  "After exams",
];

const internshipTypes = ["Remote", "On-site", "Hybrid"];

const skillOptions = [
  "Social media management (Instagram, LinkedIn, TikTok)",
  "Content creation / copywriting",
  "Client outreach / lead generation",
  "Web development (HTML, CSS, JS, React, etc.)",
  "App development (Flutter, React Native, etc.)",
  "Graphic design (Canva, Figma, Photoshop)",
  "MS Office / Google Suite",
  "Other",
];

const hearOptions = [
  "LinkedIn",
  "Instagram / Facebook",
  "University notice board / faculty",
  "Friend / referral",
  "Zephortech website",
  "Other",
];

export function CareerApplicationForm() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    city: "",
    university: "",
    degree: "",
    semester: "",
    graduationYear: "",
    role: "",
    internshipType: "",
    startDate: "",
    skills: [],
    linkedin: "",
    portfolio: "",
    experience: "",
    resume: null,
    whyZephortech: "",
    heardFrom: "",
  });

  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");

  const update = (key, value) => setForm((f) => ({ ...f, [key]: value }));

  const toggleSkill = (skill) => {
    setForm((f) => ({
      ...f,
      skills: f.skills.includes(skill)
        ? f.skills.filter((s) => s !== skill)
        : [...f.skills, skill],
    }));
  };

  const validate = () => {
    const e = {};
    if (!form.fullName.trim()) e.fullName = "Required";
    if (!form.email.trim()) e.email = "Required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Invalid email";
    if (!form.phone.trim()) e.phone = "Required";
    if (!form.city.trim()) e.city = "Required";
    if (!form.university.trim()) e.university = "Required";
    if (!form.degree.trim()) e.degree = "Required";
    if (!form.semester) e.semester = "Required";
    if (!form.role) e.role = "Required";
    if (!form.internshipType) e.internshipType = "Required";
    if (!form.startDate) e.startDate = "Required";
    if (form.skills.length === 0) e.skills = "Select at least one";
    if (!form.resume) e.resume = "Please upload your resume";
    if (!form.whyZephortech.trim()) e.whyZephortech = "Required";
    return e;
  };

  const handleSubmit = async () => {
    const e = validate();
    if (Object.keys(e).length > 0) {
      setErrors(e);
      setSubmitError("");
      const firstErr = document.querySelector(".field-error");
      if (firstErr) firstErr.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    setErrors({});
    setSubmitError("");
    setStatus("submitting");

    try {
      // Prepare form data for Formspree
      const formData = new FormData();
      
      // Add all text fields
      formData.append("fullName", form.fullName);
      formData.append("email", form.email);
      formData.append("phone", form.phone);
      formData.append("city", form.city);
      formData.append("university", form.university);
      formData.append("degree", form.degree);
      formData.append("semester", form.semester);
      formData.append("graduationYear", form.graduationYear);
      formData.append("role", form.role);
      formData.append("internshipType", form.internshipType);
      formData.append("startDate", form.startDate);
      formData.append("skills", form.skills.join(", "));
      formData.append("linkedin", form.linkedin);
      formData.append("portfolio", form.portfolio);
      formData.append("experience", form.experience);
      formData.append("whyZephortech", form.whyZephortech);
      formData.append("heardFrom", form.heardFrom);
      // Attach the actual resume file so the server can upload it to storage
      if (form.resume) {
        // Basic client-side validation (max 5MB, allowed types)
        const allowed = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
        if (form.resume.size > 5 * 1024 * 1024) {
          setSubmitError("Resume must be 5 MB or smaller.");
          setStatus("error");
          return;
        }
        if (form.resume.type && !allowed.includes(form.resume.type)) {
          setSubmitError("Resume must be PDF or DOC/DOCX.");
          setStatus("error");
          return;
        }
        formData.append("resume", form.resume);
      }

      const res = await fetch("/api/careers/apply", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData,
      });

      const responseText = await res.text();
      let responseData = null;

      try {
        responseData = responseText ? JSON.parse(responseText) : null;
      } catch {
        responseData = null;
      }

      if (res.ok && (!responseData || responseData.ok !== false)) {
        setStatus("success");
        // Reset form
        setForm({
          fullName: "",
          email: "",
          phone: "",
          city: "",
          university: "",
          degree: "",
          semester: "",
          graduationYear: "",
          role: "",
          internshipType: "",
          startDate: "",
          skills: [],
          linkedin: "",
          portfolio: "",
          experience: "",
          resume: null,
          whyZephortech: "",
          heardFrom: "",
        });
      } else {
        const message =
          responseData?.errors?.[0]?.message ||
          responseData?.error ||
          responseText ||
          `Form submission failed (${res.status})`;
        console.error("Form submission error:", message, responseData);
        setSubmitError(message);
        setStatus("error");
      }
    } catch (error) {
      console.error("Form submission failed:", error);
      setSubmitError(error?.message || "Something went wrong. Please try again.");
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div style={styles.page}>
        <div style={styles.successCard}>
          <div style={styles.successIcon}>✓</div>
          <h2 style={styles.successTitle}>Application Submitted!</h2>
          <p style={styles.successText}>
            Thank you for applying to Zephortech. We'll review your application and get back to you within 5–7 working days.
          </p>
          <p style={styles.successSub}>zephortech.com</p>
        </div>
      </div>
    );
  }

  const err = (key) =>
    errors[key] ? (
      <span className="field-error" style={styles.errorText}>
        {errors[key]}
      </span>
    ) : null;

  return (
    <div style={styles.page}>
      <div style={styles.container}>

        {/* Header */}
        <div style={styles.header}>
          <div style={styles.headerTopRow}>
            <div style={styles.logoMark}>Z</div>
            <span style={styles.logoName}>Zephortech</span>
          </div>
          <h1 style={styles.headerTitle}>Internship Application 2025</h1>
          <p style={styles.headerDesc}>
            Join a growing tech company. We're hiring across Business Development,
            Social Media Management, Web Development, and App Development.
            Shortlisted candidates will be contacted within 5–7 working days.
          </p>
          <div style={styles.headerMeta}>
            <span>Fields marked <span style={{ color: "#F87171" }}>*</span> are required</span>
            <span style={styles.dot}>·</span>
            <a href="https://zephortech.com" style={styles.headerLink}>zephortech.com</a>
          </div>
        </div>

        {/* Section 1: Personal Info */}
        <Section title="Personal Information" icon="👤">
          <Field label="Full Name" required error={err("fullName")}>
            <Input value={form.fullName} onChange={(v) => update("fullName", v)} placeholder="Enter your full name" />
          </Field>
          <Row>
            <Field label="Email Address" required error={err("email")}>
              <Input value={form.email} onChange={(v) => update("email", v)} placeholder="example@email.com" type="email" />
            </Field>
            <Field label="Phone / WhatsApp" required error={err("phone")}>
              <Input value={form.phone} onChange={(v) => update("phone", v)} placeholder="+92 300 0000000" />
            </Field>
          </Row>
          <Field label="City / Location" required error={err("city")}>
            <Input value={form.city} onChange={(v) => update("city", v)} placeholder="e.g. Lahore, Karachi, Islamabad" />
          </Field>
        </Section>

        {/* Section 2: Education */}
        <Section title="Education" icon="🎓">
          <Row>
            <Field label="University / Institute" required error={err("university")}>
              <Input value={form.university} onChange={(v) => update("university", v)} placeholder="e.g. FAST NUCES, LUMS, UET" />
            </Field>
            <Field label="Degree Program" required error={err("degree")}>
              <Input value={form.degree} onChange={(v) => update("degree", v)} placeholder="e.g. BS Computer Science" />
            </Field>
          </Row>
          <Field label="Current Semester / Year" required error={err("semester")}>
            <RadioGroup options={semesters} value={form.semester} onChange={(v) => update("semester", v)} />
          </Field>
          <Field label="Expected Graduation Year">
            <Input value={form.graduationYear} onChange={(v) => update("graduationYear", v)} placeholder="e.g. 2026" />
          </Field>
        </Section>

        {/* Section 3: Role */}
        <Section title="Role Preference" icon="💼">
          <Field label="Applying For" required error={err("role")}>
            <div style={styles.roleGrid}>
              {roles.map((r) => (
                <button
                  key={r.value}
                  type="button"
                  onClick={() => update("role", r.value)}
                  style={{
                    ...styles.roleCard,
                    ...(form.role === r.value ? styles.roleCardActive : {}),
                  }}
                >
                  {r.label}
                  {r.priority && <span style={styles.priorityBadge}>Priority</span>}
                </button>
              ))}
            </div>
          </Field>
          <Row>
            <Field label="Internship Type" required error={err("internshipType")}>
              <RadioGroup options={internshipTypes} value={form.internshipType} onChange={(v) => update("internshipType", v)} horizontal />
            </Field>
            <Field label="Available to Start" required error={err("startDate")}>
              <RadioGroup options={startOptions} value={form.startDate} onChange={(v) => update("startDate", v)} />
            </Field>
          </Row>
        </Section>

        {/* Section 4: Skills */}
        <Section title="Skills & Experience" icon="🛠">
          <Field label="Relevant Skills" required error={err("skills")}>
            <CheckboxGroup options={skillOptions} selected={form.skills} onToggle={toggleSkill} />
          </Field>
          <Row>
            <Field label="LinkedIn Profile URL">
              <Input value={form.linkedin} onChange={(v) => update("linkedin", v)} placeholder="https://linkedin.com/in/yourname" />
            </Field>
            <Field label="Portfolio / GitHub / Website">
              <Input value={form.portfolio} onChange={(v) => update("portfolio", v)} placeholder="Optional link" />
            </Field>
          </Row>
          <Field label="Previous Experience or Projects">
            <Textarea value={form.experience} onChange={(v) => update("experience", v)} placeholder="Briefly describe any internships, freelance work, or projects..." rows={3} />
          </Field>
        </Section>

        {/* Section 5: Resume */}
        <Section title="Resume / CV" icon="📄">
          <Field label="Upload Your Resume" required error={err("resume")}>
            <div
              style={{
                ...styles.uploadBox,
                ...(form.resume ? styles.uploadBoxFilled : {}),
              }}
              onClick={() => {
                const elem = document.getElementById("resumeInput");
                if (elem) elem.click();
              }}
            >
              <input
                id="resumeInput"
                type="file"
                accept=".pdf,.doc,.docx"
                style={{ display: "none" }}
                onChange={(e) => update("resume", e.target.files ? e.target.files[0] || null : null)}
              />
              {form.resume ? (
                <>
                  <div style={styles.uploadIcon}>✓</div>
                  <p style={styles.uploadFileName}>{form.resume.name}</p>
                  <p style={styles.uploadHint}>Click to change file</p>
                </>
              ) : (
                <>
                  <div style={styles.uploadIcon}>↑</div>
                  <p style={styles.uploadText}>Click to browse and upload</p>
                  <p style={styles.uploadHint}>PDF or DOCX · Max 10 MB</p>
                </>
              )}
            </div>
          </Field>
        </Section>

        {/* Section 6: Final */}
        <Section title="Final Questions" icon="✍️">
          <Field label="Why do you want to intern at Zephortech?" required error={err("whyZephortech")}>
            <Textarea value={form.whyZephortech} onChange={(v) => update("whyZephortech", v)} placeholder="Tell us in 2–3 sentences..." rows={4} />
          </Field>
          <Field label="How did you hear about this opportunity?">
            <RadioGroup options={hearOptions} value={form.heardFrom} onChange={(v) => update("heardFrom", v)} horizontal />
          </Field>
        </Section>

        {/* Submit */}
        {status === "error" && (
          <div style={styles.errorBanner}>
            {submitError || "Something went wrong. Please try again or email us directly."}
          </div>
        )}
        <button
          type="button"
          onClick={handleSubmit}
          disabled={status === "submitting"}
          style={{
            ...styles.submitBtn,
            ...(status === "submitting" ? styles.submitBtnDisabled : {}),
          }}
        >
          {status === "submitting" ? "Submitting..." : "Submit Application →"}
        </button>

        <p style={styles.footer}>Zephortech · zephortech.com · All information is kept confidential.</p>
      </div>
    </div>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function Section({ title, icon, children }) {
  return (
    <div style={styles.section}>
      <div style={styles.sectionHeader}>
        <span style={styles.sectionIcon}>{icon}</span>
        <h2 style={styles.sectionTitle}>{title}</h2>
      </div>
      <div style={styles.sectionBody}>{children}</div>
    </div>
  );
}

function Field({ label, required, error, children }) {
  return (
    <div style={styles.field}>
      <label style={styles.label}>
        {label} {required && <span style={{ color: "#EF4444" }}>*</span>}
      </label>
      {children}
      {error}
    </div>
  );
}

function Row({ children }) {
  return <div style={styles.row}>{children}</div>;
}

function Input({ value, onChange, placeholder, type = "text" }) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      style={styles.input}
      onFocus={(e) => (e.target.style.borderColor = "#1E3A5F")}
      onBlur={(e) => (e.target.style.borderColor = "#D1D5DB")}
    />
  );
}

function Textarea({ value, onChange, placeholder, rows = 3 }) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      style={styles.textarea}
      onFocus={(e) => (e.target.style.borderColor = "#1E3A5F")}
      onBlur={(e) => (e.target.style.borderColor = "#D1D5DB")}
    />
  );
}

function RadioGroup({ options, value, onChange, horizontal }) {
  return (
    <div style={horizontal ? styles.radioGroupH : styles.radioGroupV}>
      {options.map((opt) => (
        <label key={opt} style={styles.radioLabel}>
          <div
            style={{
              ...styles.radioCircle,
              ...(value === opt ? styles.radioCircleActive : {}),
            }}
            onClick={() => onChange(opt)}
          >
            {value === opt && <div style={styles.radioDot} />}
          </div>
          <span style={styles.radioText} onClick={() => onChange(opt)}>{opt}</span>
        </label>
      ))}
    </div>
  );
}

function CheckboxGroup({ options, selected, onToggle }) {
  return (
    <div style={styles.checkGrid}>
      {options.map((opt) => (
        <label key={opt} style={styles.checkLabel} onClick={() => onToggle(opt)}>
          <div
            style={{
              ...styles.checkbox,
              ...(selected.includes(opt) ? styles.checkboxActive : {}),
            }}
          >
            {selected.includes(opt) && <span style={styles.checkmark}>✓</span>}
          </div>
          <span style={styles.checkText}>{opt}</span>
        </label>
      ))}
    </div>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = {
  page: {
    minHeight: "100vh",
    background: "#F0F4F8",
    padding: "2rem 1rem",
    fontFamily: "'Georgia', 'Times New Roman', serif",
  },
  container: {
    maxWidth: 700,
    margin: "0 auto",
  },

  // Header
  header: {
    background: "linear-gradient(135deg, #0B1F3A 0%, #1E3A5F 60%, #0F2A4A 100%)",
    borderRadius: "14px 14px 0 0",
    padding: "2rem 2rem 1.75rem",
    borderBottom: "4px solid #C9A84C",
  },
  headerTopRow: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    marginBottom: 16,
  },
  logoMark: {
    width: 38,
    height: 38,
    background: "#C9A84C",
    borderRadius: 8,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 700,
    fontSize: 20,
    color: "#0B1F3A",
    fontFamily: "Georgia, serif",
  },
  logoName: {
    color: "#E8E0D0",
    fontSize: 18,
    fontWeight: 600,
    letterSpacing: "0.04em",
  },
  headerTitle: {
    color: "#FFFFFF",
    fontSize: 26,
    fontWeight: 700,
    margin: "0 0 10px",
    letterSpacing: "-0.01em",
  },
  headerDesc: {
    color: "#A8BCCF",
    fontSize: 14,
    lineHeight: 1.7,
    margin: "0 0 14px",
  },
  headerMeta: {
    display: "flex",
    gap: 8,
    alignItems: "center",
    fontSize: 12,
    color: "#7A99B8",
  },
  dot: { color: "#4A6A8A" },
  headerLink: { color: "#C9A84C", textDecoration: "none" },

  // Section
  section: {
    background: "#FFFFFF",
    borderLeft: "1px solid #E5EAF0",
    borderRight: "1px solid #E5EAF0",
    borderBottom: "1px solid #E5EAF0",
    overflow: "hidden",
  },
  sectionHeader: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: "1rem 1.75rem",
    background: "#F7F9FC",
    borderBottom: "1px solid #E5EAF0",
  },
  sectionIcon: { fontSize: 16 },
  sectionTitle: {
    fontSize: 13,
    fontWeight: 600,
    color: "#1E3A5F",
    margin: 0,
    letterSpacing: "0.06em",
    textTransform: "uppercase",
    fontFamily: "Georgia, serif",
  },
  sectionBody: {
    padding: "1.5rem 1.75rem",
    display: "flex",
    flexDirection: "column",
    gap: 18,
  },

  // Fields
  field: { display: "flex", flexDirection: "column", gap: 6, flex: 1 },
  label: { fontSize: 13, fontWeight: 600, color: "#2D3748", fontFamily: "Georgia, serif" },
  row: { display: "flex", gap: 16, flexWrap: "wrap" },
  errorText: { fontSize: 11, color: "#EF4444", marginTop: 2 },

  // Inputs
  input: {
    width: "100%",
    padding: "10px 12px",
    border: "1px solid #D1D5DB",
    borderRadius: 8,
    fontSize: 13,
    color: "#1A202C",
    background: "#FAFAFA",
    outline: "none",
    boxSizing: "border-box",
    transition: "border-color 0.2s",
    fontFamily: "Georgia, serif",
  },
  textarea: {
    width: "100%",
    padding: "10px 12px",
    border: "1px solid #D1D5DB",
    borderRadius: 8,
    fontSize: 13,
    color: "#1A202C",
    background: "#FAFAFA",
    outline: "none",
    boxSizing: "border-box",
    resize: "vertical",
    fontFamily: "Georgia, serif",
    lineHeight: 1.6,
  },

  // Radio
  radioGroupV: { display: "flex", flexDirection: "column", gap: 8 },
  radioGroupH: { display: "flex", flexWrap: "wrap", gap: "8px 20px" },
  radioLabel: { display: "flex", alignItems: "center", gap: 8, cursor: "pointer" },
  radioCircle: {
    width: 16,
    height: 16,
    borderRadius: "50%",
    border: "2px solid #CBD5E0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    cursor: "pointer",
    transition: "border-color 0.2s",
  },
  radioCircleActive: { border: "2px solid #1E3A5F" },
  radioDot: { width: 7, height: 7, borderRadius: "50%", background: "#1E3A5F" },
  radioText: { fontSize: 13, color: "#374151", cursor: "pointer" },

  // Checkbox
  checkGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px 12px" },
  checkLabel: { display: "flex", alignItems: "flex-start", gap: 8, cursor: "pointer" },
  checkbox: {
    width: 16,
    height: 16,
    borderRadius: 4,
    border: "2px solid #CBD5E0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    cursor: "pointer",
    marginTop: 1,
    transition: "all 0.15s",
  },
  checkboxActive: { background: "#1E3A5F", border: "2px solid #1E3A5F" },
  checkmark: { color: "white", fontSize: 10, fontWeight: 700 },
  checkText: { fontSize: 12.5, color: "#374151", lineHeight: 1.4 },

  // Role cards
  roleGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 },
  roleCard: {
    padding: "12px 14px",
    border: "1.5px solid #E2E8F0",
    borderRadius: 10,
    background: "#FAFAFA",
    fontSize: 13,
    color: "#374151",
    cursor: "pointer",
    textAlign: "left",
    display: "flex",
    flexDirection: "column",
    gap: 6,
    transition: "all 0.2s",
    fontFamily: "Georgia, serif",
  },
  roleCardActive: {
    border: "1.5px solid #1E3A5F",
    background: "#EEF3FA",
    color: "#1E3A5F",
  },
  priorityBadge: {
    display: "inline-block",
    background: "#FEF3C7",
    color: "#92400E",
    fontSize: 10,
    padding: "2px 7px",
    borderRadius: 99,
    fontWeight: 600,
    width: "fit-content",
  },

  // Upload
  uploadBox: {
    border: "2px dashed #CBD5E0",
    borderRadius: 10,
    padding: "28px 20px",
    textAlign: "center",
    cursor: "pointer",
    background: "#FAFAFA",
    transition: "all 0.2s",
  },
  uploadBoxFilled: {
    border: "2px dashed #1E3A5F",
    background: "#EEF3FA",
  },
  uploadIcon: { fontSize: 26, color: "#1E3A5F", marginBottom: 8 },
  uploadText: { fontSize: 13, color: "#374151", fontWeight: 600, margin: "0 0 4px" },
  uploadFileName: { fontSize: 13, color: "#1E3A5F", fontWeight: 600, margin: "0 0 4px" },
  uploadHint: { fontSize: 11, color: "#9CA3AF", margin: 0 },

  // Submit
  submitBtn: {
    width: "100%",
    padding: "15px",
    background: "linear-gradient(135deg, #0B1F3A, #1E3A5F)",
    color: "white",
    border: "none",
    borderRadius: "0 0 14px 14px",
    fontSize: 15,
    fontWeight: 600,
    cursor: "pointer",
    letterSpacing: "0.03em",
    fontFamily: "Georgia, serif",
    transition: "opacity 0.2s",
  },
  submitBtnDisabled: { opacity: 0.6, cursor: "not-allowed" },
  errorBanner: {
    background: "#FEF2F2",
    border: "1px solid #FECACA",
    color: "#B91C1C",
    padding: "12px 16px",
    fontSize: 13,
    borderRadius: 8,
    marginBottom: 12,
  },
  footer: {
    textAlign: "center",
    fontSize: 11,
    color: "#9CA3AF",
    marginTop: 16,
    fontFamily: "Georgia, serif",
  },

  // Success
  successCard: {
    maxWidth: 480,
    margin: "5rem auto",
    background: "#FFFFFF",
    borderRadius: 14,
    padding: "3rem 2rem",
    textAlign: "center",
    border: "1px solid #E5EAF0",
  },
  successIcon: {
    width: 60,
    height: 60,
    background: "#0B1F3A",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 24,
    color: "white",
    margin: "0 auto 20px",
  },
  successTitle: { fontSize: 22, color: "#0B1F3A", margin: "0 0 12px", fontFamily: "Georgia, serif" },
  successText: { fontSize: 14, color: "#4A5568", lineHeight: 1.7, margin: "0 0 16px" },
  successSub: { fontSize: 12, color: "#C9A84C" },
};
