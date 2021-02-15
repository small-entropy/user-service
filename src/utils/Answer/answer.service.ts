import { Injectable } from '@nestjs/common';
import { Serializer, Error as JsonApiError } from 'jsonapi-serializer';

@Injectable()
export class AnswerService {
  private getFinalDataOrErrors(value) {
    return new Promise((resolve, reject) => {
      try {
        let finalValue;
        const isArray = Array.isArray(value);
        if (isArray) {
          finalValue = value.length ? value : null;
        } else {
          finalValue = value ? value : null;
        }
        resolve(finalValue);
      } catch (error) {
        reject(error);
      }
    });
  }

  private getSerializedErrors(errors) {
    return new Promise((resolve, reject) => {
      try {
        const serializedErrors = JsonApiError(errors);
        resolve(serializedErrors);
      } catch (error) {
        reject(errors);
      }
    });
  }

  private getSerializedData(data, dataType, options) {
    return new Promise((resolve, reject) => {
      try {
        const JsonApiSerializer = new Serializer(dataType, options);
        const serializedData = JsonApiSerializer.serialize(data);
        resolve(serializedData);
      } catch (error) {
        reject(error);
      }
    });
  }

  async getAnswer(data, errors = [], meta = null, dataType?, options?) {
    try {
      const serializedDataIndex = 0;
      const serializedErrorsIndex = 1;
      const promises = (dataType && options)
        ? [
          this.getSerializedData(data, dataType, options),
          this.getSerializedErrors(errors),
        ]
        : [
          this.getFinalDataOrErrors(data),
          this.getFinalDataOrErrors(errors),
        ];
      const results = await Promise.all(promises);
      return {
        data: results[serializedDataIndex],
        errors: results[serializedErrorsIndex],
        meta,
      };
    } catch (error) {
      throw error;
    }
  }


}