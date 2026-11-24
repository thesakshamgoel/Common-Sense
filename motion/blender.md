# Motion: 3D and Blender
Part of the Motion Playbook (`motion-playbook.md` in the project root has the index, the working order, the ban list and the rubric). Section 15. Section numbers match the index.

## 15. 3D and Blender (when the Blender MCP is connected)
Tools (read their descriptions before use): run Python in the open Blender (`execute_blender_code`), run Python on a closed .blend in a background process (`..._for_cli`), summaries (objects, datablocks, missing files, linked libraries, paths, object detail), screenshots of the Blender window, viewport and thumbnail renders to a path, API docs search, and jump-to tools.
Safety (the code runs with full `bpy` access on the user's machine)
- Before the first change, save a versioned copy of the open .blend (`name_v2.blend`) and work in that. Never overwrite the user's original. Tell the user which file is being edited.
- Code sent to Blender stays inside the scene: no file deletion, no network, no subprocess, no changes to Blender preferences or add-ons, no writes outside the project folder. Ask first for anything beyond that.
- Read before writing: `get_objects_summary` and the missing-files summary first. Never delete or rename the user's objects, collections or materials without asking. Add your own work in a new collection with a clear name.
- Look up unfamiliar API in the bundled docs (`search_api_docs`, `get_python_api_docs`) for the installed Blender version. Do not write `bpy` calls from memory when the version could differ.
Method
- Same discipline as the rest of the playbook: tokens in one place (durations, easing, camera numbers), keyframes generated from them, scene built by a script that can be re-run from scratch so it can be fixed and rebuilt rather than patched by hand.
- Frame range, fps, resolution and colour management come from the signed-off spec. Set them in the script, never assume the defaults.
- Check cheap first: thumbnail render, then a few single frames (one per beat and one mid-transition), then the viewport or full render once. Estimate render time on a single frame and tell the user before any long render. Use the thumbnail tool, not the full render, for iteration.
- Camera: keyframe position and focal length from the shot list, follow the subject (a track-to or follow-path constraint plus an eased empty), no static camera on a held shot. Camera moves go through the same ease and spring tokens.
- Lighting follows the Design rule: one visible key light, shadows from it, effects subtle.
- Check the render output exists on the user's disk, at the right resolution and frame count, before saying it passed. View frames from every shot.
- Where the project already uses web rendering (Playwright, Remotion), 3D shots can be rendered as image sequences and composited there. Say which route is used and why in the motion brief.
- Report plainly what Blender cannot do here (missing add-on, no GPU, render too slow) and offer the closest alternative.
