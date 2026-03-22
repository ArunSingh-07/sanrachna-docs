# System Architecture and Methodology

This document outlines the technical architecture and research methodology for the offline-first AI productivity system.

## 1. System Overview

The system utilizes a hybrid, edge-heavy computing model. The desktop PC functions as a "thick client" acting as the AI host, while mobile devices function as "thin clients" that rely on the desktop for processing-heavy AI tasks.

```text
[ Mobile Client (Kotlin/Compose) ]
       | (Thin Client)
       | SQLite Local Store
       |
       v
[ Synchronization Server (Rust/Axum/Postgres) ]
       ^ (Event-Sourced Sync)
       |
       |
[ Desktop Host (Primary "AI Brain") ]
       |-- Frontend: React, Vite, TailwindCSS (Dynamic UI Renderer)
       |-- IPC Bridge: Tauri
       |-- Core Engine: Rust (Tasks, Notes, Events, Settings)
       |-- Local Data: SQLite
       |-- AI Engine: Ollama (Llama 3, Mistral) / Whisper.cpp
```

## 2. Dynamic UI Generation System

A critical research component is the Generation Pipeline for Dynamic User Interfaces.

1. **User Input:** "Create a daily habit tracker with water intake and exercise."
2. **Local AI Processing:** The local LLM processes the request through a strictly constrained prompt template, outputting a deterministic JSON schema.
3. **Schema Validation:** The Rust core engine validates the output against a pre-defined meta-schema.
4. **Data Persistence:** The schema is stored in the `user_apps` table, and a corresponding dynamic data table is initialized.
5. **UI Rendering:** The React frontend parses the schema and maps generic data types (text, number, boolean) to specific React components (TextInput, NumberInput, Toggle).

### Security Boundaries
To ensure system integrity, the AI model operates with strict limitations:
* It cannot execute arbitrary code.
* It cannot directly mutate the database (all interactions are routed through Rust validation layers).
* It has zero file system write access.

## 3. Decentralized Sync Protocol

To maintain the offline-first requirement, synchronization relies on an event-sourcing paradigm rather than CRUD operations.

* All state transitions (task creation, note edits, app generation) are heavily logged as atomic `events` with a timestamp and payload.
* During synchronization, the client transmits its `last_event_id`.
* The server resolves conflicts based on Lamport timestamps or Vector Clocks and returns the delta of missing events.
* The mobile application submits `ai_requests` as events, which the desktop AI engine processes during its next online interval, synchronizing the result back.

## 4. Privacy-Preserving Internet Search

As an optional, opt-in module, the system includes an isolated internet search capability. The module leverages `reqwest` and `scraper` in Rust.
The AI search pipeline operates locally: fetching raw HTML, extracting text, and performing summarization locally, without sending the user's queries to commercial LLM APIs.
