/**
 * Shared carbon conversion constants decoupled from the main app logic.
 * These metrics convert user activity sizes (km, kWh, meals) into annual kg CO2.
 */

export const EMISSION_FACTORS = {
    // Car commute standard average: ~0.2 kg CO2 per km
    COMMUTE: 0.2,
    // Electricity standard grid average: ~0.4 kg CO2 per kWh
    GRID: 0.4,
    // Diet meat-heavy average impact per meal: ~2.1 kg CO2
    DIET: 2.1
};

// Target: 4,000 kg (4 tonnes) per person annual carbon footprint goal (common global reduction target)
export const GLOBAL_TARGET = 4000;
