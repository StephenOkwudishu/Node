/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import CognitiveOS from './CognitiveOS';
import { ThemeProvider } from './components/Common';

export default function App() {
  return (
    <ThemeProvider>
      <CognitiveOS />
    </ThemeProvider>
  );
}
