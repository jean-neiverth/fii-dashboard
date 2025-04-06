/**
 * Interface for document structure
 */
interface FiiDocument {
  id: string;
  post_id: string;
  ticker: string;
  date_event: string;
  document_type: string;
  name: string;
  url?: string;
  rendimento?: string;
  dy?: string;
  data_pagamento?: string;
  data_base?: string;
  dateKey?: string;
  [key: string]: any; // For any additional properties
}

/**
 * Interface for input data structure
 */
interface FiiRawData {
  documents: {
    [date: string]: FiiDocument[];
  };
}

/**
 * Interface for the parsed result
 */
interface FiiParsedData {
  dy: string | null;
  dy12m: string | null;
  relevant: string | null;
  relevantDaysGap: number | null;
  report: string | null;
  reportDaysGap: number | null;
}

/**
 * Parse FII data to extract key metrics and documents
 * @param data - Raw FII data object with documents organized by date
 * @returns Extracted FII metrics including dy, dy12m, and latest documents with day gaps
 */
export function parseFiiData(data: FiiRawData | null): FiiParsedData {
  // Initialize result object with null values
  const result: FiiParsedData = {
    dy: null,
    dy12m: null,
    relevant: null,
    relevantDaysGap: null,
    report: null,
    reportDaysGap: null,
  };

  if (!data || !data.documents) {
    return result;
  }

  // Get current date for calculating day gaps
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Normalize to start of day

  // Convert the document object into an array of documents with dates
  const allDocuments: (FiiDocument & { dateKey: string })[] = [];

  for (const dateKey in data.documents) {
    const documentsForDate = data.documents[dateKey];
    documentsForDate.forEach((doc) => {
      allDocuments.push({
        ...doc,
        dateKey, // Add the date as a property for sorting
      });
    });
  }

  // Sort documents by date in descending order (newest first)
  allDocuments.sort((a, b) => {
    return new Date(b.dateKey).getTime() - new Date(a.dateKey).getTime();
  });

  // Get all rendimento documents to calculate dy12m
  const rendimentoDocuments = allDocuments.filter(
    (doc) => doc.document_type === "Rendimento"
  );

  // Get latest rendimento document for dy
  const latestRendimento = rendimentoDocuments[0];
  if (latestRendimento && latestRendimento.dy) {
    result.dy = parseFloat(latestRendimento.dy).toFixed(2) || null;

    // Calculate dy12m (mean of all dy values)
    if (rendimentoDocuments.length > 0) {
      const dyValues = rendimentoDocuments
        .map((doc) => (doc.dy ? parseFloat(doc.dy) : 0))
        .filter((val) => !isNaN(val));

      if (dyValues.length > 0) {
        result.dy12m = (
          dyValues.reduce((sum, value) => sum + value, 0) / dyValues.length
        ).toFixed(2);
      }
    }
  }

  // Get latest fato_relevante document
  const relevantDocs = allDocuments.filter(
    (doc) => doc.document_type === "fato_relevante"
  );
  const latestRelevant = relevantDocs[0];
  if (latestRelevant) {
    result.relevant = latestRelevant.url || null;

    // Calculate days gap
    if (latestRelevant.dateKey) {
      const docDate = new Date(latestRelevant.dateKey);
      docDate.setHours(0, 0, 0, 0); // Normalize to start of day
      result.relevantDaysGap = calculateDaysDifference(today, docDate);
    }
  }

  // Get latest relatorio document
  const reportDocs = allDocuments.filter(
    (doc) => doc.document_type === "relatorio"
  );
  const latestReport = reportDocs[0];
  if (latestReport) {
    result.report = latestReport.url || null;

    // Calculate days gap
    if (latestReport.dateKey) {
      const docDate = new Date(latestReport.dateKey);
      docDate.setHours(0, 0, 0, 0); // Normalize to start of day
      result.reportDaysGap = calculateDaysDifference(today, docDate);
    }
  }

  return result;
}

/**
 * Calculate the number of days between two dates
 * @param currentDate - The current date
 * @param documentDate - The document's date
 * @returns Number of days between the dates
 */
function calculateDaysDifference(
  currentDate: Date,
  documentDate: Date
): number {
  // Calculate difference in milliseconds
  const diffTime = Math.abs(currentDate.getTime() - documentDate.getTime());
  // Convert to days
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}

// Example usage:
// const result = parseFiiData(data);
// console.log(result);
