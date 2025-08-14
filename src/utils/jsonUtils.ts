import { jsonrepair } from 'jsonrepair';

export interface JsonRepairResult<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  repaired?: boolean;
}

export function safeJsonParse<T = unknown>(jsonString: string): JsonRepairResult<T> {
  try {
    const parsed = JSON.parse(jsonString);
    return {
      success: true,
      data: parsed,
      repaired: false
    };
  } catch (error) {
    try {
      const repairedJson = jsonrepair(jsonString);
      const parsed = JSON.parse(repairedJson);
      return {
        success: true,
        data: parsed,
        repaired: true
      };
    } catch (repairError) {
      return {
        success: false,
        error: `JSON解析失败: ${error instanceof Error ? error.message : String(error)}`
      };
    }
  }
}

export function formatJsonResponse<T = unknown>(data: T): string {
  try {
    return JSON.stringify(data, null, 2);
  } catch (error) {
    return JSON.stringify({
      error: '数据序列化失败',
      message: error instanceof Error ? error.message : String(error)
    }, null, 2);
  }
}

export function createJsonResponse<T = unknown>(data: T, success: boolean = true, message?: string): string {
  const response = {
    success,
    data,
    message,
    timestamp: new Date().toISOString()
  };
  
  return formatJsonResponse(response);
}

export function repairAndValidateJson(jsonString: string): { isValid: boolean; repairedJson?: string; error?: string } {
  try {
    JSON.parse(jsonString);
    return { isValid: true, repairedJson: jsonString };
  } catch (error) {
    try {
      const repaired = jsonrepair(jsonString);
      JSON.parse(repaired);
      return { 
        isValid: true, 
        repairedJson: repaired 
      };
    } catch (repairError) {
      return { 
        isValid: false, 
        error: `无法修复JSON: ${repairError instanceof Error ? repairError.message : String(repairError)}`
      };
    }
  }
}