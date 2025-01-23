import sdk, { Project } from '@stackblitz/sdk';

import './styles.css';
import { javascriptProject } from './templates/javascript';
import { nodeProject } from './templates/node';

const PROJECTS = {
  javascript: javascriptProject,
  node: nodeProject,
};

let project: Project = PROJECTS.javascript;

/**
 * Embed the project
 */
async function embedProject() {
  sdk.embedProject('embed', project, {
    height: 400,
    openFile: 'index.js',
    terminalHeight: 50,
  });
}

/**
 * Open the project in a new window on StackBlitz
 */
function openProject() {
  sdk.openProject(project, {
    openFile: 'index.js',
  });
}

/**
 * Select a project to embed or open
 */
function setTemplate(element: HTMLSelectElement) {
  const key = element.value;
  const target = document.getElementById('embed');

  if (PROJECTS[key]) {
    project = PROJECTS[key];
    // Redo embedding if already embedded
    if (target && target.tagName === 'IFRAME') {
      embedProject();
    }
  } else {
    console.warn('Unknown project: ' + key);
  }
}

// Make our methods available in HTML
(window as any).demo = {
  embedProject,
  openProject,
  setTemplate,
};
